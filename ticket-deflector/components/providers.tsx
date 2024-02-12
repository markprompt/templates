'use client';

import { ChatProvider } from '@markprompt/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import * as React from 'react';
import { Toaster } from 'sonner';

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ChatProvider
        chatOptions={{
          apiUrl: 'http://api.localhost:3000/chat',
          model: 'gpt-4-turbo-preview',
          systemPrompt:
            'You are an expert AI technical support assistant from Markprompt who excels at helping people solving their issues. You never ask follow up questions.',
        }}
        projectKey={process.env.NEXT_PUBLIC_PROJECT_KEY!}
      >
        {children}
        <Toaster />
      </ChatProvider>
    </NextThemesProvider>
  );
}
