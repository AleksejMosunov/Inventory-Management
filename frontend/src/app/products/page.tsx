'use client';

import { lazy, Suspense } from 'react';
import Spinner from '@/components/Spinner/Spinner';

const ProductsPage = lazy(() => import('@/lazy-pages/ProductsPage'));

export default function ProductsRoute(): React.ReactElement {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductsPage />
    </Suspense>
  );
}
