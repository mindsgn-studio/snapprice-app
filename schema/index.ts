import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const items = sqliteTable('items', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid').notNull().unique(),
    image: text('image').notNull(),
    brand: text('brand').default(""),
    title: text('title').notNull(),
    link: text('link').notNull().unique(),
    source: text('source'),
    category_id: integer('category_id'),
    created_at: text("created_at"),
    updated_at: text("updated_at"),
});

export const statistics = sqliteTable('statistics', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    item_uuid: text('item_uuid').notNull().unique(),
    current: integer('current'),
    average: integer('average'),
    change: integer('change'),
    highest: integer('highest'),
    previous: integer('previous').default(0),
    lowest: integer('lowest'),
    created_at: text("created_at"),
    updated_at: text("updated_at"),
});

export const category = sqliteTable('category', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull().unique(),
    description: text('description'),
    background: text('background'),
    color: text('color'),
    label: text('label').unique(),
    value:  text('value').unique(),
    created_at: text("created_at"),
    updated_at: text("updated_at"),
});

export const images = sqliteTable('images', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    item_uuid: text('item_uuid').notNull().unique(),
    image: text('image').notNull(),
    created_at: text("created_at"),
    updated_at: text("updated_at"),
});

export const prices = sqliteTable('prices', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    item_uuid: text('item_uuid').notNull().unique(),
    price: integer('price').notNull(),
    date: text('date').notNull().unique(),
});

export const user = sqliteTable('user', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    uuid: text('uuid'),
    first_time: text("first_time").default(""),
    onboarded: text("onboarded").default("false"),
    version: text("version"),
    created_at: text("created_at"),
    updated_at: text("updated_at"),
});

export type Items = typeof items.$inferSelect;
export type Category = typeof category.$inferSelect;
export type Prices = typeof prices.$inferSelect;
export type User = typeof user.$inferSelect;
export type Images = typeof images.$inferSelect;