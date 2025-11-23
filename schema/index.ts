import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const items = sqliteTable('items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull().unique(),
    image: text('image').notNull(),
    brand: text('brand').default(""),
    title: text('title').notNull(),
    link: text('link').notNull().unique(),
    source: text('source'),
    created_at: text("created_at"),
    updated_at: text("updated_at"),
});

export const images = sqliteTable('images', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull(),
    image: text('image').notNull(),
});

export const prices = sqliteTable('prices', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull(),
    price: integer('price').notNull(),
    date: text('date').notNull().unique(),
});

export const user = sqliteTable('user', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid'),
    first_time: text("first_time").default("false"),
    onboarded: text("onboarded").default("false"),
    version: text("version"),
    created_at: text("created_at"),
});

export type Items = typeof items.$inferSelect;
export type Prices = typeof prices.$inferSelect;
export type User = typeof user.$inferSelect;
export type Images = typeof images.$inferSelect;