import { render, screen } from '@testing-library/react';
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu';

jest.mock('next/navigation', () => ({
  usePathname: () => '/orders',
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('NavigationMenu', () => {
  it('renders links', () => {
    render(<NavigationMenu />);
    expect(screen.getByText('orders')).toBeInTheDocument();
    expect(screen.getByText('products')).toBeInTheDocument();
  });
});
