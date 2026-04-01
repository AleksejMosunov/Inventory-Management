import { Router } from "express";
import { body } from "express-validator";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
} from "../controllers/ordersController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.use(authMiddleware);

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post(
  "/",
  body("title").notEmpty().withMessage("Title is required"),
  createOrder,
);
router.delete("/:id", deleteOrder);

export default router;
