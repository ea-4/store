import { z } from "zod";
import { UUIDSchema, MoneySchema, TimestampSchema } from "./common";

// Staff Roles
export const StaffRoleEnum = z.enum([
  "super_admin",
  "admin",
  "inventory_manager",
  "support",
]);
export type StaffRole = z.infer<typeof StaffRoleEnum>;

// Phone Technical Specifications
export const PhoneSpecsSchema = z.object({
  brand: z.string().min(1),
  os: z.enum(["iOS", "Android"]),
  ram: z.string(), // e.g. "8GB", "12GB"
  storage: z.string(), // e.g. "128GB", "256GB"
  battery: z.string(), // e.g. "4500mAh"
  network: z.enum(["4G", "5G"]),
  screenSize: z.string().optional(), // e.g. "6.1 inch"
});
export type PhoneSpecs = z.infer<typeof PhoneSpecsSchema>;

// Sellable Variant (owns the SKU, price, color, and stock)
export const ProductVariantSchema = z.object({
  id: UUIDSchema,
  productId: UUIDSchema,
  sku: z.string().min(3).max(50),
  colorName: z.string(),
  colorHex: z.string().regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "Invalid hex color"),
  storageTier: z.string(), // e.g. "256GB"
  priceInPesewas: MoneySchema,
  compareAtPriceInPesewas: MoneySchema.optional(),
  stockQuantity: z.number().int().nonnegative(),
  images: z.array(z.string().url()),
  isActive: z.boolean().default(true),
});
export type ProductVariant = z.infer<typeof ProductVariantSchema>;

// Base Product (customer-facing parent)
export const ProductSchema = z.object({
  id: UUIDSchema,
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(["smartphones", "accessories"]),
  description: z.string(),
  specs: PhoneSpecsSchema,
  basePriceInPesewas: MoneySchema,
  isPublished: z.boolean().default(false),
  variants: z.array(ProductVariantSchema).optional(),
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
});
export type Product = z.infer<typeof ProductSchema>;