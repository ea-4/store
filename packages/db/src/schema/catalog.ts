import { pgTable, uuid, varchar, text, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 64 }).notNull(), // 'smartphones' | 'accessories'
  description: text("description").notNull(),
  specs: jsonb("specs").notNull(), // brand, os, ram, storage, battery, network
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const productVariants = pgTable("product_variants", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }).notNull(),
  sku: varchar("sku", { length: 64 }).notNull().unique(),
  colorName: varchar("color_name", { length: 64 }).notNull(),
  colorHex: varchar("color_hex", { length: 16 }).notNull(),
  storageTier: varchar("storage_tier", { length: 32 }).notNull(), // e.g. "128GB"
  priceInPesewas: integer("price_in_pesewas").notNull(),
  compareAtPriceInPesewas: integer("compare_at_price_in_pesewas"),
  stockQuantity: integer("stock_quantity").default(0).notNull(),
  images: jsonb("images").$type<string[]>().default([]).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});