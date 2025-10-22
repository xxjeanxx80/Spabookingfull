'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useMemo, useState } from 'react';

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());
  const memoised = useMemo(() => client, [client]);

  return <QueryClientProvider client={memoised}>{children}</QueryClientProvider>;
}
