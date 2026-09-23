import { Router } from "express";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/product.controllers.js";

import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get("/", getProducts);
router.get("/seller", verifyJWT, getMyProducts);
router.get("/:id", getProductById);

router.post("/", verifyJWT, createProduct);
router.put("/:id", verifyJWT, updateProduct);
router.delete("/:id", verifyJWT, deleteProduct);

export default router;
