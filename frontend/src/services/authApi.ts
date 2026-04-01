import { api } from "./api";

export interface AuthPayload {
  email: string;
  password: string;
}

export const authApi = {
  login: async (payload: AuthPayload): Promise<{ token: string }> => {
    const response = await api.post<{ token: string }>("/auth/login", payload);
    return response.data;
  },
  register: async (payload: AuthPayload): Promise<void> => {
    await api.post("/auth/register", payload);
  },
};
