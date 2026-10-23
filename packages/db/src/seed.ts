import * as dotenv from "dotenv";
import path from "path";
import { eq } from "drizzle-orm";
import { createDbClient } from "./index";
import { products, productVariants } from "./schema/catalog";

// Load root .env file
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not defined in environment variables");
  }

  const db = createDbClient(dbUrl);

  console.log("🌱 Seeding database with initial catalog...");

  // Prices are stored as integers representing pesewas (e.g., GHS 12,500.00 = 1250000 pesewas)
  const getOrCreateProduct = async (
    values: typeof products.$inferInsert,
  ) => {
    const [existingProduct] = await db
      .select()
      .from(products)
      .where(eq(products.slug, values.slug))
      .limit(1);

    if (existingProduct) {
      return existingProduct;
    }

    const [insertedProduct] = await db
      .insert(products)
      .values(values)
      .returning();

    return insertedProduct;
  };

  const insertedProduct = await getOrCreateProduct({
      name: "iPhone 15 Pro",
      slug: "iphone-15-pro",
      category: "smartphones",
      description:
        "Titanium design, A17 Pro chip, and a powerhouse camera system.",
      specs: {
        brand: "Apple",
        os: "iOS",
        ram: "8GB",
        storage: "128GB",
        battery: "3274mAh",
        network: "5G",
      },
      isPublished: true,
  });

  console.log(`✅ Ready: ${insertedProduct.name}`);

  await db.insert(productVariants).values([
    {
      productId: insertedProduct.id,
      sku: "IP15P-128-NAT",
      colorName: "Natural Titanium",
      colorHex: "#A8A9AD",
      storageTier: "128GB",
      priceInPesewas: 1250000,
      compareAtPriceInPesewas: null,
      stockQuantity: 10,
      images: [],
      isActive: true,
    },
    {
      productId: insertedProduct.id,
      sku: "IP15P-256-NAT",
      colorName: "Natural Titanium",
      colorHex: "#A8A9AD",
      storageTier: "256GB",
      priceInPesewas: 1400000,
      compareAtPriceInPesewas: null,
      stockQuantity: 5,
      images: [],
      isActive: true,
    },
  ]).onConflictDoNothing();

  const galaxyProduct = await getOrCreateProduct({
      name: "Samsung Galaxy S24",
      slug: "samsung-galaxy-s24",
      category: "smartphones",
      description:
        "A compact flagship smartphone with a bright display and versatile camera system.",
      specs: {
        brand: "Samsung",
        os: "Android",
        ram: "8GB",
        storage: "128GB",
        battery: "4000mAh",
        network: "5G",
      },
      isPublished: true,
  });

  await db.insert(productVariants).values([
    {
      productId: galaxyProduct.id,
      sku: "SGS24-128-BLK",
      colorName: "Onyx Black",
      colorHex: "#202124",
      storageTier: "128GB",
      priceInPesewas: 950000,
      compareAtPriceInPesewas: null,
      stockQuantity: 8,
      images: [],
      isActive: true,
    },
    {
      productId: galaxyProduct.id,
      sku: "SGS24-256-BLK",
      colorName: "Onyx Black",
      colorHex: "#202124",
      storageTier: "256GB",
      priceInPesewas: 1050000,
      compareAtPriceInPesewas: null,
      stockQuantity: 6,
      images: [],
      isActive: true,
    },
  ]).onConflictDoNothing();

  const airPodsProduct = await getOrCreateProduct({
      name: "AirPods Pro (2nd Generation)",
      slug: "airpods-pro-2nd-generation",
      category: "accessories",
      description:
        "Premium wireless earbuds with active noise cancellation and a MagSafe charging case.",
      specs: {
        brand: "Apple",
        connectivity: "Bluetooth 5.3",
        battery: "Up to 6 hours",
        charging: "USB-C",
        waterResistance: "IPX4",
      },
      isPublished: true,
  });

  await db.insert(productVariants).values({
    productId: airPodsProduct.id,
    sku: "APP2-USBC-WHT",
    colorName: "White",
    colorHex: "#FFFFFF",
    storageTier: "Standard",
    priceInPesewas: 320000,
    compareAtPriceInPesewas: null,
    stockQuantity: 15,
    images: [],
    isActive: true,
  }).onConflictDoNothing();

  console.log("✅ Created product variants successfully");
  console.log("🚀 Database seeding completed!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
