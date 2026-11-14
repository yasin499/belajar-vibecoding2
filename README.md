# belajar-vibecoding2

Backend sederhana dengan **Bun + ElysiaJS + Drizzle ORM + MySQL**.

## Prasyarat

- [Bun](https://bun.sh/) v1.0+
- MySQL 8.0+

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Buat database MySQL

Masuk ke MySQL dan buat database:

```sql
CREATE DATABASE belajar_vibecoding2;
```

### 3. Konfigurasi environment

Copy file `.env.example` menjadi `.env`, lalu sesuaikan isinya:

```bash
cp .env.example .env
```

Isi `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=belajar_vibecoding2
PORT=3000
```

### 4. Generate & jalankan migrasi

```bash
# Generate file migrasi SQL dari schema
bun run db:generate

# Jalankan migrasi ke database
bun run db:migrate
```

### 5. Jalankan server

```bash
# Development (auto-reload)
bun run dev

# Production
bun run start
```

Server berjalan di `http://localhost:3000`.

---

## API Endpoints

### Health Check

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/` | Health check server |

### Todos

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/todos` | Ambil semua todo |
| GET | `/todos/:id` | Ambil todo berdasarkan ID |
| POST | `/todos` | Buat todo baru |
| PATCH | `/todos/:id` | Update todo |
| DELETE | `/todos/:id` | Hapus todo |

#### Contoh Request

**POST /todos**
```json
{
  "title": "Belajar ElysiaJS",
  "completed": false
}
```

**PATCH /todos/:id**
```json
{
  "completed": true
}
```

---

## Struktur Folder

```
src/
  index.ts          ← Entry point server
  db/
    index.ts        ← Koneksi Drizzle ke MySQL
    schema.ts       ← Definisi tabel
    migrate.ts      ← Script runner migrasi
  routes/
    todos.ts        ← CRUD endpoint todos
drizzle/            ← File migrasi SQL (auto-generated)
drizzle.config.ts   ← Konfigurasi drizzle-kit
.env                ← Environment variables (tidak di-commit)
.env.example        ← Template environment variables
```
