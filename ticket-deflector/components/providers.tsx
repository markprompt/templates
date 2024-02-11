'use client';

import { ChatProvider } from '@markprompt/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ChatProvider
        chatOptions={{}}
        projectKey={process.env.NEXT_PUBLIC_PROJECT_KEY!}
      >
        {children}
      </ChatProvider>
    </NextThemesProvider>
  );
}
