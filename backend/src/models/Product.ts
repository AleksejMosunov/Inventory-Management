import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/database";

interface ProductAttributes {
  id: number;
  serialNumber: string;
  isNew: boolean;
  photo: string | null;
  title: string;
  type: string;
  specification: string | null;
  guaranteeStart: string | null;
  guaranteeEnd: string | null;
  priceUsd: number;
  priceUah: number;
  orderId: number;
  createdAt: Date;
}

interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  | "id"
  | "photo"
  | "specification"
  | "guaranteeStart"
  | "guaranteeEnd"
  | "createdAt"
> {}

export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  declare id: number;
  declare serialNumber: string;
  declare isNew: boolean;
  declare photo: string | null;
  declare title: string;
  declare type: string;
  declare specification: string | null;
  declare guaranteeStart: string | null;
  declare guaranteeEnd: string | null;
  declare priceUsd: number;
  declare priceUah: number;
  declare orderId: number;
  declare readonly createdAt: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    serialNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "serial_number",
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: "is_new",
    },
    photo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    specification: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    guaranteeStart: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "guarantee_start",
    },
    guaranteeEnd: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "guarantee_end",
    },
    priceUsd: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "price_usd",
    },
    priceUah: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "price_uah",
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "order_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    underscored: true,
    timestamps: true,
    updatedAt: false,
  },
);
