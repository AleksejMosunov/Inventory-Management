import { api } from "./api";
import { Product } from "@/types/product";

export const productsApi = {
  getAll: async (type?: string): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products", {
      params: type ? { type } : {},
    });
    return response.data;
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
