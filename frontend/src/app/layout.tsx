import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Providers from './providers';
import AppShell from '@/components/AppShell/AppShell';

const manrope = Manrope({
  variable: '--font-body',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Inventory Management',
  description: 'Orders and products management SPA',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>): React.ReactElement {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
