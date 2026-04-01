'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Order } from '@/types/order';
import { formatPrice } from '@/utils/formatPrice';

interface OrderDetailProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetail({ order, onClose }: OrderDetailProps): React.ReactElement {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      {order ? (
        <motion.aside
          className="card p-3 h-100"
          initial={{ x: 250, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 250, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">{t('orderDetails')}</h4>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close" />
          </div>
          <p>
            <strong>{t('description')}:</strong> {order.description || '-'}
          </p>
          <ul className="list-group mb-3">
            {(order.products || []).map((product) => (
              <li key={product.id} className="list-group-item d-flex justify-content-between">
                <span>{product.title}</span>
                <span>{formatPrice(Number(product.priceUsd), 'USD')}</span>
              </li>
            ))}
          </ul>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
