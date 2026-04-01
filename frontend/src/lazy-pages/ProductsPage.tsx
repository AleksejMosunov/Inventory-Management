'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteConfirmModal from '@/components/DeleteConfirmModal/DeleteConfirmModal';
import PageTransition from '@/components/PageTransition/PageTransition';
import ProductFilter from '@/components/ProductFilter/ProductFilter';
import Spinner from '@/components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { deleteProduct, fetchProducts, setFilterType } from '@/store/productsSlice';
import { Product } from '@/types/product';
import { formatDateLong, formatDateShort } from '@/utils/formatDate';
import { formatPrice } from '@/utils/formatPrice';

export default function ProductsPage(): React.ReactElement {
  const { i18n, t } = useTranslation();
  const dispatch = useAppDispatch();
  const { items, loading, filterType } = useAppSelector((state) => state.products);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  useEffect(() => {
    void dispatch(fetchProducts(filterType || undefined));
  }, [dispatch, filterType]);

  const locale = useMemo(() => (i18n.language === 'ua' ? 'uk-UA' : 'en-US'), [i18n.language]);
  const types = useMemo(() => Array.from(new Set(items.map((item) => item.type))), [items]);

  return (
    <PageTransition>
      <h2 className="mb-3">{t('products')}</h2>
      <ProductFilter
        types={types}
        value={filterType}
        onChange={(value) => {
          dispatch(setFilterType(value));
        }}
      />
      {loading ? <Spinner /> : null}
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Title</th>
              <th>Type</th>
              <th>Guarantee</th>
              <th>USD</th>
              <th>UAH</th>
              <th>Order</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.photo} alt={product.title} width={48} height={48} style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
                <td>{product.title}</td>
                <td>{product.type}</td>
                <td>
                  <div>{product.guaranteeStart ? formatDateShort(product.guaranteeStart, locale) : '-'}</div>
                  <div>{product.guaranteeEnd ? formatDateLong(product.guaranteeEnd, locale) : '-'}</div>
                </td>
                <td>{formatPrice(Number(product.priceUsd), 'USD')}</td>
                <td>{formatPrice(Number(product.priceUah), 'UAH')}</td>
                <td>{product.order?.title || '-'}</td>
                <td>
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setModalProduct(product)}>
                    {t('delete')}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteConfirmModal
        isOpen={Boolean(modalProduct)}
        name={modalProduct?.title || ''}
        onCancel={() => setModalProduct(null)}
        onConfirm={() => {
          if (modalProduct) {
            void dispatch(deleteProduct(modalProduct.id));
            setModalProduct(null);
          }
        }}
      />
    </PageTransition>
  );
}
