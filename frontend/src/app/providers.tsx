'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import '@/i18n/config';

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps): React.ReactElement {
  return <Provider store={store}>{children}</Provider>;
}
