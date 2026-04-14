import { sqliteTable, text } from "drizzle-orm/sqlite-core"
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

export const user = sqliteTable('users', {
  id: text().primaryKey(),
  email: text().notNull(),
  name: text().notNull(),
  password: text().notNull(),
});

const userInsertSchema = createInsertSchema(user);
const userUpdateSchema = createUpdateSchema(user);

export const room = sqliteTable('rooms', {
  id: text().primaryKey(),
  name: text().notNull(),
  password: text(),
  owner: text().notNull().references(() => user.id),
});

const roomInsertSchema = createInsertSchema(room);
const roomUpdateSchema = createUpdateSchema(room);

export type insertUser = z.infer<typeof userInsertSchema>;
export type insertRoom = z.infer<typeof roomInsertSchema>;

export type updateUser = z.infer<typeof userUpdateSchema>;
export type updateRoom = z.infer<typeof roomUpdateSchema>;
