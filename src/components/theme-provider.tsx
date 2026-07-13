"use client"

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Filtra o aviso/erro do React 19 sobre a tag <script> em ambiente de desenvolvimento.
// O next-themes injeta uma tag <script> inline para evitar o flicker do tema na renderização inicial (SSR/hydration).
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const orig = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
      return;
    }
    orig.apply(console, args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}