export interface Product {
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
  createdAt: string;
  order?: {
    id: number;
    title: string;
  };
}
