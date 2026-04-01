'use client';

import { Order } from '@/types/order';
import { formatDateLong, formatDateShort } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';

interface OrderCardProps {
  order: Order;
  locale: string;
  onOpen: (id: number) => void;
  onDelete: (order: Order) => void;
}

export default function OrderCard({ order, locale, onOpen, onDelete }: OrderCardProps): React.ReactElement {
  return (
    <div className="card mb-3 order-card" role="button" onClick={() => onOpen(order.id)}>
      <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h5 className="card-title mb-1">{order.title}</h5>
          <p className="mb-1 text-muted">{formatDateShort(order.createdAt, locale)}</p>
          <p className="mb-1 text-muted">{formatDateLong(order.createdAt, locale)}</p>
        </div>
        <div>
          <p className="mb-1">Products: {order.productsCount ?? 0}</p>
          <p className="mb-1">{formatPrice(order.totalUsd ?? 0, 'USD')}</p>
          <p className="mb-0">{formatPrice(order.totalUah ?? 0, 'UAH')}</p>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={(event) => {
            event.stopPropagation();
            onDelete(order);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
