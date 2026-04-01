import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface OrderAttributes {
  id: number;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderCreationAttributes extends Optional<
  OrderAttributes,
  "id" | "description" | "createdAt" | "updatedAt"
> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> {
  declare id: number;
  declare title: string;
  declare description: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
    },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    underscored: true,
    timestamps: true,
  },
);
