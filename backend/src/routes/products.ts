import { Router } from "express";
import { body } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productsController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  body("serialNumber").notEmpty(),
  body("title").notEmpty(),
  body("type").notEmpty(),
  body("priceUsd").isFloat({ min: 0 }),
  body("priceUah").isFloat({ min: 0 }),
  body("orderId").isInt({ min: 1 }),
  createProduct,
);
router.delete("/:id", deleteProduct);

export default router;
