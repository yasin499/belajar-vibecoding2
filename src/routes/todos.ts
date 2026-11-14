import Elysia, { t } from "elysia";
import { db } from "../db";
import { todos } from "../db/schema";
import { eq } from "drizzle-orm";

export const todosRoutes = new Elysia({ prefix: "/todos" })
  .get("/", async () => {
    const all = await db.select().from(todos);
    return { data: all };
  })
  .get("/:id", async ({ params: { id }, error }) => {
    const result = await db.select().from(todos).where(eq(todos.id, Number(id)));
    if (!result[0]) return error(404, { message: "Todo not found" });
    return { data: result[0] };
  })
  .post(
    "/",
    async ({ body }) => {
      const inserted = await db.insert(todos).values(body);
      return { message: "Created", id: Number(inserted[0].insertId) };
    },
    {
      body: t.Object({
        title: t.String({ minLength: 1 }),
        completed: t.Optional(t.Boolean()),
      }),
    }
  )
  .patch(
    "/:id",
    async ({ params: { id }, body, error }) => {
      const existing = await db.select().from(todos).where(eq(todos.id, Number(id)));
      if (!existing[0]) return error(404, { message: "Todo not found" });
      await db.update(todos).set(body).where(eq(todos.id, Number(id)));
      return { message: "Updated" };
    },
    {
      body: t.Object({
        title: t.Optional(t.String({ minLength: 1 })),
        completed: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete("/:id", async ({ params: { id }, error }) => {
    const existing = await db.select().from(todos).where(eq(todos.id, Number(id)));
    if (!existing[0]) return error(404, { message: "Todo not found" });
    await db.delete(todos).where(eq(todos.id, Number(id)));
    return { message: "Deleted" };
  });
