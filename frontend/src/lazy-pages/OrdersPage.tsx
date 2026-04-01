'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteConfirmModal from '@/components/DeleteConfirmModal/DeleteConfirmModal';
import OrderCard from '@/components/OrderCard/OrderCard';
import OrderDetail from '@/components/OrderDetail/OrderDetail';
import PageTransition from '@/components/PageTransition/PageTransition';
import Spinner from '@/components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { clearSelectedOrder, deleteOrder, fetchOrderById, fetchOrders } from '@/store/ordersSlice';
import { Order } from '@/types/order';

export default function OrdersPage(): React.ReactElement {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, selectedOrder, loading } = useAppSelector((state) => state.orders);
  const [modalOrder, setModalOrder] = useState<Order | null>(null);

  useEffect(() => {
    void dispatch(fetchOrders());
  }, [dispatch]);

  const locale = useMemo(() => (i18n.language === 'ua' ? 'uk-UA' : 'en-US'), [i18n.language]);

  const handleDelete = async (): Promise<void> => {
    if (modalOrder) {
      await dispatch(deleteOrder(modalOrder.id));
      setModalOrder(null);
    }
  };

  return (
    <PageTransition>
      <div className="row g-3">
        <section className="col-12 col-lg-7">
          <h2 className="mb-3">{t('orders')}</h2>
          {loading ? <Spinner /> : null}
          {items.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              locale={locale}
              onOpen={(id) => {
                void dispatch(fetchOrderById(id));
              }}
              onDelete={(nextOrder) => setModalOrder(nextOrder)}
            />
          ))}
        </section>
        <section className="col-12 col-lg-5">
          <OrderDetail order={selectedOrder} onClose={() => dispatch(clearSelectedOrder())} />
        </section>
      </div>
      <DeleteConfirmModal
        isOpen={Boolean(modalOrder)}
        name={modalOrder?.title || ''}
        onCancel={() => setModalOrder(null)}
        onConfirm={() => {
          void handleDelete();
        }}
      />
    </PageTransition>
  );
}
