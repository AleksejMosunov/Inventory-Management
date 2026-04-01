import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Order } from "../models/Order";
import { Product } from "../models/Product";

export const getOrders = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const orders = await Order.findAll({
    include: [{ model: Product, as: "products" }],
    order: [["id", "ASC"]],
  });

  const response = orders.map((order) => {
    const products = (order as Order & { products?: Product[] }).products || [];
    const totalUsd = products.reduce(
      (sum, item) => sum + Number(item.priceUsd),
      0,
    );
    const totalUah = products.reduce(
      (sum, item) => sum + Number(item.priceUah),
      0,
    );

    return {
      ...order.toJSON(),
      productsCount: products.length,
      totalUsd,
      totalUah,
    };
  });

  res.json(response);
};

export const getOrderById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const orderId = Number(req.params.id);
  const order = await Order.findByPk(orderId, {
    include: [{ model: Product, as: "products" }],
  });

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  res.json(order);
};

export const createOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { title, description } = req.body;
  const order = await Order.create({ title, description: description || null });

  res.status(201).json(order);
};

export const deleteOrder = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const orderId = Number(req.params.id);
  const order = await Order.findByPk(orderId);

  if (!order) {
    res.status(404).json({ message: "Order not found" });
    return;
  }

  await order.destroy();
  res.json({ message: "Order deleted" });
};
