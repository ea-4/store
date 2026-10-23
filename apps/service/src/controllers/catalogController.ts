import { getPublishedProducts, getProductBySlug } from "@repo/db";


export const getAllProducts = async (req: any, res: any, next: any) => {
  try {
    const db_url = process.env.DATABASE_URL || "";

     if (!db_url) {
      throw new Error("DATABASE_URL is not configured");
    }

    const data = await getPublishedProducts(db_url);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
export const getProductViaSlug = async (req: any, res: any, next: any) => {
  try {
    const db_url = process.env.DATABASE_URL || "";

    if (!db_url) {
      throw new Error("DATABASE_URL is not configured");
    }

    const product = await getProductBySlug(db_url, req.params.slug);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};
