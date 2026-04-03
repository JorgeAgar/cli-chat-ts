import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const user = sqliteTable('users', {
  id: text().primaryKey(),
  email: text().notNull(),
  name: text().notNull(),
  password: text().notNull(),
});

export const userInsertSchema = createInsertSchema(user);

export const room = sqliteTable('rooms', {
  id: text().primaryKey(),
  name: text().notNull(),
  password: text(),
  owner: text().notNull().references(() => user.id),
});

const roomInsertSchema = createInsertSchema(room);

export type insertUser = z.infer<typeof userInsertSchema>;
export type insertRoom = z.infer<typeof roomInsertSchema>;
