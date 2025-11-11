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
    date: text('date').notNull().unique(),
});

export const user = sqliteTable('user', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull(),
});

export type Items = typeof items.$inferSelect;
export type Prices = typeof prices.$inferSelect;
export type User = typeof user.$inferSelect;