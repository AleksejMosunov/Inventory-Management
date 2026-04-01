'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';
import TopMenu from '@/components/TopMenu/TopMenu';
import { useAuth } from '@/hooks/useAuth';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
}

const AUTH_ROUTES = ['/login', '/register'];

export default function AppShell({ children }: AppShellProps): React.ReactElement {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before mount, render children only (avoids SSR mismatch on conditional layout)
  if (!mounted) {
    return <>{children}</>;
  }

  if (AUTH_ROUTES.includes(pathname ?? '')) {
    return <>{children}</>;
  }

  return (
    <div className={styles.shell}>
      <TopMenu />
      <div className={styles.shell__content}>
        <NavigationMenu />
        <main className={styles.shell__main}>{children}</main>
      </div>
    </div>
  );
}
