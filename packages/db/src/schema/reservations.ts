// packages/db/src/schema/reservations.ts
import { pgTable, uuid, varchar, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { productVariants } from "./catalog";

export const reservationStatusEnum = pgEnum("reservation_status", [
  "active",
  "consumed",
  "expired",
  "released",
]);

export const inventoryReservations = pgTable("inventory_reservations", {
  id: uuid("id").defaultRandom().primaryKey(),
  cartSessionId: varchar("cart_session_id", { length: 128 }).notNull(),
  variantId: uuid("variant_id").references(() => productVariants.id).notNull(),
  quantity: integer("quantity").notNull(),
  status: reservationStatusEnum("status").default("active").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});