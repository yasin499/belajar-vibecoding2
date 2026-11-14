import { Elysia } from "elysia";
import { todosRoutes } from "./routes/todos";

const app = new Elysia()
  .get("/", () => ({
    status: "ok",
    message: "Server berjalan dengan baik 🚀",
    timestamp: new Date().toISOString(),
  }))
  .use(todosRoutes)
  .listen(Number(process.env.PORT) || 3000);

console.log(`🦊 Server berjalan di http://localhost:${app.server?.port}`);
