'use client';

import { lazy, Suspense } from 'react';
import Spinner from '@/components/Spinner/Spinner';

const OrdersPage = lazy(() => import('@/lazy-pages/OrdersPage'));

export default function OrdersRoute(): React.ReactElement {
  return (
    <Suspense fallback={<Spinner />}>
      <OrdersPage />
    </Suspense>
  );
}
