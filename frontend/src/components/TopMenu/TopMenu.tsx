'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { formatDateTime } from '@/utils/formatDate';
import { useSocket } from '@/hooks/useSocket';
import { useAppDispatch } from '@/hooks/redux';
import { clearToken } from '@/store/authSlice';
import styles from './TopMenu.module.css';

export default function TopMenu(): React.ReactElement {
  const { i18n, t } = useTranslation();
  const [now, setNow] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);
  const sessionsCount = useSocket();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = (): void => {
    localStorage.removeItem('token');
    dispatch(clearToken());
    router.replace('/login');
  };

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const locale = useMemo(() => (i18n.language === 'ua' ? 'uk-UA' : 'en-US'), [i18n.language]);

  return (
    <header className={styles['top-menu']}>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <div className={styles['top-menu__brand']}>Inventory Management</div>
        <div className={styles['top-menu__meta']}>
          <div className={styles['top-menu__clock']}>
            {mounted && now ? formatDateTime(now, locale) : '\u00A0'}
          </div>
          <div className={styles['top-menu__sessions']}>
            {t('sessions')}: {mounted ? sessionsCount : 0}
          </div>
          {mounted ? (
            <select
              className="form-select form-select-sm"
              style={{ width: 90 }}
              value={i18n.language}
              onChange={(event) => {
                void i18n.changeLanguage(event.target.value);
              }}
            >
              <option value="en">EN</option>
              <option value="ua">UA</option>
            </select>
          ) : (
            <select className="form-select form-select-sm" style={{ width: 90 }} defaultValue="en">
              <option value="en">EN</option>
              <option value="ua">UA</option>
            </select>
          )}
          <button
            className={styles['top-menu__logout']}
            onClick={handleLogout}
            title={t('logout')}
          >
            {t('logout')}
          </button>
        </div>
      </div>
    </header>
  );
}
