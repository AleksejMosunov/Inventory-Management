import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDatabase } from "./config/database";
import { Order } from "./models/Order";
import { Product } from "./models/Product";
import "./models/User";
import authRoutes from "./routes/auth";
import ordersRoutes from "./routes/orders";
import productsRoutes from "./routes/products";
import { seedIfEmpty } from "./seed/seed";
import { setupSessionCounter } from "./socket/sessionCounter";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

Order.hasMany(Product, {
  as: "products",
  foreignKey: "orderId",
  onDelete: "CASCADE",
});
Product.belongsTo(Order, { as: "order", foreignKey: "orderId" });

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.options(
  "*",
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/products", productsRoutes);

app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

setupSessionCounter(io);

const port = Number(process.env.PORT || 5000);

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    await seedIfEmpty();

    server.listen(port, () => {
      console.log(`Backend running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error);
    process.exit(1);
  }
};

void startServer();
