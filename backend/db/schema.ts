import { sqliteTable, text } from "drizzle-orm/sqlite-core"

export const user = sqliteTable('users', {
  id: text().primaryKey(),
  email: text().notNull(),
  name: text().notNull(),
  password: text().notNull(),
});

export const room = sqliteTable('rooms', {
  id: text().primaryKey(),
  name: text().notNull(),
  password: text(),
  owner: text().notNull().references(() => user.id),
});
