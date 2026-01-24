import { pgTable, text, timestamp, uuid, boolean, numeric, jsonb } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    stack_user_id: text("stack_user_id").unique().notNull(),
    email: text("email").notNull(),
    role: text("role").default("user"),
    permissions: jsonb("permissions").$type<string[]>(),
    last_login: timestamp("last_login").defaultNow(),
    created_at: timestamp("created_at").defaultNow(),
});

export const plots = pgTable("plots", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    slug: text("slug").unique().notNull(),
    location: text("location").notNull(),
    price: numeric("price").notNull(),
    size_sqyd: numeric("size_sqyd").notNull(),
    size_unit: text("size_unit").default("sq.yd"),
    description: text("description"),
    images: jsonb("images").$type<string[]>(),
    featured: boolean("featured").default(false),
    is_published: boolean("is_published").default(true),
    tag: text("tag"), // e.g. "Residential", "Commercial", "Verified"
    map_coordinates: text("map_coordinates"),
    created_at: timestamp("created_at").defaultNow(),
});

export const posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title"),
    slug: text("slug").unique(),
    content: text("content"),
    cover_image: text("cover_image"),
    published: boolean("published").default(false),
    created_at: timestamp("created_at").defaultNow(),
});

export const inquiries = pgTable("inquiries", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    message: text("message"),
    status: text("status").default("new"), // new, contacted, closed
    plot_id: uuid("plot_id").references(() => plots.id),
    created_at: timestamp("created_at").defaultNow(),
});

export const locations = pgTable("locations", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").unique().notNull(),
    connectivity: text("connectivity"),
    growth: text("growth"),
    image: text("image"),
    overview: text("overview"),
    literacy_rate: text("literacy_rate"),
    jobs: text("jobs"),
    returns: text("returns"),
    highlights: jsonb("highlights").$type<string[]>(),
    created_at: timestamp("created_at").defaultNow(),
});
