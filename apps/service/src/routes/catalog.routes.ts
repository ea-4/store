import express from "express";
import {
  getAllProducts,
  getProductViaSlug,
} from "../controllers/catalogController";
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:slug", getProductViaSlug);

export default router;
