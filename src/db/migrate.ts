import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "belajar_vibecoding2",
  multipleStatements: true,
});

const db = drizzle(connection);

await migrate(db, { migrationsFolder: "./drizzle" });
console.log("✅ Migration berhasil!");
await connection.end();
