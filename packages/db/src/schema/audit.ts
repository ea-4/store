// packages/db/src/schema/audit.ts
import { pgTable, uuid, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { staffUsers } from "./users";

export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  staffUserId: uuid("staff_user_id").references(() => staffUsers.id),
  action: varchar("action", { length: 64 }).notNull(), // e.g. "STOCK_ADJUSTMENT", "PRICE_UPDATE"
  resourceType: varchar("resource_type", { length: 64 }).notNull(),
  resourceId: varchar("resource_id", { length: 128 }).notNull(),
  changes: jsonb("changes").notNull(), // diff of before/after
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});