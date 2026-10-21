import { pgTable, uuid, varchar, text, integer, jsonb, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { productVariants } from "./catalog";
import { customers } from "./users";

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "successful",
  "failed",
  "refunded",
]);

export const fulfillmentStatusEnum = pgEnum("fulfillment_status", [
  "new",
  "processing",
  "ready_for_pickup",
  "fulfilled",
  "cancelled",
]);

export const orders = pgTable("orders", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull().unique(),
  customerId: uuid("customer_id").references(() => customers.id),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 32 }).notNull(),
  totalAmountInPesewas: integer("total_amount_in_pesewas").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").default("pending").notNull(),
  fulfillmentStatus: fulfillmentStatusEnum("fulfillment_status").default("new").notNull(),
  paymentReference: varchar("payment_reference", { length: 128 }), // Paystack reference
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id").references(() => orders.id, { onDelete: "cascade" }).notNull(),
  variantId: uuid("variant_id").references(() => productVariants.id),
  // Immutable point-in-time snapshot
  productName: varchar("product_name", { length: 255 }).notNull(),
  variantSku: varchar("variant_sku", { length: 64 }).notNull(),
  unitPriceInPesewas: integer("unit_price_in_pesewas").notNull(),
  quantity: integer("quantity").notNull(),
  specsSnapshot: jsonb("specs_snapshot"),
});