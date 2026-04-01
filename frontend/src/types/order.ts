import { Product } from "./product";

export interface Order {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt?: string;
  products?: Product[];
  productsCount?: number;
  totalUsd?: number;
  totalUah?: number;
}
