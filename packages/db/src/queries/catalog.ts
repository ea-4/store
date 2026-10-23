import { createDbClient } from "../index";
import { products, productVariants } from "../schema/catalog";
import { and, eq } from "drizzle-orm";
export async function getPublishedProducts(dbUrl: string) {
  const db = createDbClient(dbUrl);

  const rows = await db
    .select({
      product: products,
      variant: productVariants,
    })
    .from(products)
    .leftJoin(
      productVariants,
      and(
        eq(products.id, productVariants.productId),
        eq(productVariants.isActive, true),
      ),
    )
    .where(eq(products.isPublished, true));

  const productMap = new Map<string, any>();

  for (const { product, variant } of rows) {
    if (!productMap.has(product.id)) {
      productMap.set(product.id, {
        ...product,
        variants: [],
      });
    }
    if (variant) {
      productMap.get(product.id).variants.push(variant);
    }
  }

  return Array.from(productMap.values());
}

export async function getProductBySlug(dbUrl: string, slug: string) {
  const db = createDbClient(dbUrl);

  const rows = await db
    .select({
      product: products,
      variant: productVariants,
    })
    .from(products)
    .leftJoin(
      productVariants,
      and(
        eq(products.id, productVariants.productId),
        eq(productVariants.isActive, true),
      ),
    )
    .where(and(eq(products.slug, slug), eq(products.isPublished, true)));
    if (rows.length === 0) return null;

    return {
        ...rows[0].product,
        variants: rows.map(row => row.variant).filter(Boolean),
    }
}
