import bcrypt from "bcryptjs";
import { connectDatabase, sequelize } from "../config/database";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { User } from "../models/User";

const ordersSeed = [
  { id: 1, title: "Приход 1", description: "Мониторы и клавиатуры" },
  { id: 2, title: "Приход 2", description: "Ноутбуки" },
  { id: 3, title: "Приход 3", description: "Телефоны и аксессуары" },
];

const productsSeed = [
  {
    serialNumber: "SN-001",
    title: 'Монитор LG 27"',
    type: "Monitors",
    isNew: true,
    guaranteeStart: "2023-01-01",
    guaranteeEnd: "2025-01-01",
    priceUsd: 250.0,
    priceUah: 9375.0,
    orderId: 1,
  },
  {
    serialNumber: "SN-002",
    title: "Клавиатура Logitech K120",
    type: "Keyboards",
    isNew: true,
    guaranteeStart: "2023-06-15",
    guaranteeEnd: "2024-06-15",
    priceUsd: 30.0,
    priceUah: 1125.0,
    orderId: 1,
  },
  {
    serialNumber: "SN-003",
    title: "Ноутбук Lenovo ThinkPad",
    type: "Laptops",
    isNew: false,
    guaranteeStart: "2022-03-01",
    guaranteeEnd: "2025-03-01",
    priceUsd: 800.0,
    priceUah: 30000.0,
    orderId: 2,
  },
  {
    serialNumber: "SN-004",
    title: "Ноутбук Dell XPS 15",
    type: "Laptops",
    isNew: true,
    guaranteeStart: "2023-09-01",
    guaranteeEnd: "2026-09-01",
    priceUsd: 1200.0,
    priceUah: 45000.0,
    orderId: 2,
  },
  {
    serialNumber: "SN-005",
    title: "iPhone 14 Pro",
    type: "Phones",
    isNew: true,
    guaranteeStart: "2023-11-01",
    guaranteeEnd: "2025-11-01",
    priceUsd: 999.0,
    priceUah: 37462.5,
    orderId: 3,
  },
  {
    serialNumber: "SN-006",
    title: "Чехол для iPhone",
    type: "Accessories",
    isNew: true,
    guaranteeStart: "2023-11-01",
    guaranteeEnd: "2024-11-01",
    priceUsd: 25.0,
    priceUah: 937.5,
    orderId: 3,
  },
  {
    serialNumber: "SN-007",
    title: "Мышка Razer DeathAdder",
    type: "Accessories",
    isNew: true,
    guaranteeStart: "2024-01-10",
    guaranteeEnd: "2026-01-10",
    priceUsd: 60.0,
    priceUah: 2250.0,
    orderId: 1,
  },
  {
    serialNumber: "SN-008",
    title: 'Монитор Samsung 32"',
    type: "Monitors",
    isNew: false,
    guaranteeStart: "2021-05-20",
    guaranteeEnd: "2024-05-20",
    priceUsd: 350.0,
    priceUah: 13125.0,
    orderId: 1,
  },
];

export const seedIfEmpty = async (): Promise<void> => {
  const ordersCount = await Order.count();
  if (ordersCount > 0) {
    return;
  }

  await Order.bulkCreate(ordersSeed);
  await Product.bulkCreate(productsSeed);

  const existingUser = await User.findOne({
    where: { email: "admin@example.com" },
  });
  if (!existingUser) {
    const password = await bcrypt.hash("123456", 10);
    await User.create({ email: "admin@example.com", password });
  }
};

if (require.main === module) {
  (async () => {
    try {
      await connectDatabase();
      await seedIfEmpty();
      console.log("Seed completed");
      await sequelize.close();
    } catch (error) {
      console.error("Seed failed:", error);
      process.exit(1);
    }
  })();
}
