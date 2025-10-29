import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const items = sqliteTable('items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    image: text('name').notNull(),
    title: text('title').notNull(),
    brand: text('brand'),
    price: integer('price'),
});

export type Task = typeof items.$inferSelect;