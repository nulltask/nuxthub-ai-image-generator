import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const images = sqliteTable("images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  prompt: text("prompt").notNull(),
  pathname: text("pathname").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
