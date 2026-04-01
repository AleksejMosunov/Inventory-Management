'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import styles from './NavigationMenu.module.css';

export default function NavigationMenu(): React.ReactElement {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__title}>Inventory</div>
      <div className={styles.nav__links}>
        <Link
          href="/orders"
          className={`${styles.nav__link} ${pathname === '/orders' ? styles['nav__link--active'] : ''}`}
        >
          <span>O</span>
          <span>{t('orders')}</span>
        </Link>
        <Link
          href="/products"
          className={`${styles.nav__link} ${pathname === '/products' ? styles['nav__link--active'] : ''}`}
        >
          <span>P</span>
          <span>{t('products')}</span>
        </Link>
      </div>
    </nav>
  );
}
