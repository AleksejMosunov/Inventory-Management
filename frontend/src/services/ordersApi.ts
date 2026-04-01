import { api } from "./api";
import { Order } from "@/types/order";

export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/orders");
    return response.data;
  },
  getById: async (id: number): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${id}`);
    return response.data;
  },
  remove: async (id: number): Promise<void> => {
    await api.delete(`/orders/${id}`);
  },
};
