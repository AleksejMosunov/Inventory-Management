import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Product } from "../models/Product";
import { Order } from "../models/Order";

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const where: { type?: string } = {};
  if (req.query.type) {
    where.type = String(req.query.type);
  }

  const products = await Product.findAll({
    where,
    include: [{ model: Order, as: "order", attributes: ["id", "title"] }],
    order: [["id", "ASC"]],
  });

  res.json(products);
};

export const getProductById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const productId = Number(req.params.id);
  const product = await Product.findByPk(productId, {
    include: [{ model: Order, as: "order", attributes: ["id", "title"] }],
  });

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(product);
};

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const {
    serialNumber,
    isNew,
    photo,
    title,
    type,
    specification,
    guaranteeStart,
    guaranteeEnd,
    priceUsd,
    priceUah,
    orderId,
  } = req.body;

  const order = await Order.findByPk(orderId);
  if (!order) {
    res.status(400).json({ message: "Invalid orderId" });
    return;
  }

  const product = await Product.create({
    serialNumber,
    isNew,
    photo: photo || null,
    title,
    type,
    specification: specification || null,
    guaranteeStart: guaranteeStart || null,
    guaranteeEnd: guaranteeEnd || null,
    priceUsd,
    priceUah,
    orderId,
  });

  res.status(201).json(product);
};

export const deleteProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const productId = Number(req.params.id);
  const product = await Product.findByPk(productId);

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  await product.destroy();
  res.json({ message: "Product deleted" });
};
