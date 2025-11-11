import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const items = sqliteTable('items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull().unique(),
    image: text('image').notNull(),
    title: text('title').notNull(),
    link: text('link').notNull().unique(),
    source: text('source').notNull(),
});

export const prices = sqliteTable('prices', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull(),
    price: integer('price').notNull(),
    date: text('date').notNull(),
});

export type Items = typeof items.$inferSelect;
export type Prices = typeof prices.$inferSelect;