import { mysqlTable, text, varchar, int } from "drizzle-orm/mysql-core";

/**
 * This is a sample schema.
 * Replace this with your own schema and then run migrations.
 */

export const user = mysqlTable("user", {
  id: int("id").autoincrement().primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

export const post = mysqlTable("post", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title"),
  likes: int("likes"),
  userId: int("userId"),
});
