'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';
import { Toaster } from 'sonner';

import { ChatFormProvider } from './chat-form-context';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ChatFormProvider>{children}</ChatFormProvider>
      <Toaster />
    </NextThemesProvider>
  );
}
