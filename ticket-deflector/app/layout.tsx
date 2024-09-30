/* eslint-disable @next/next/no-img-element */
import { Inter as FontSans, Fira_Code as FontMono } from 'next/font/google';
import '@markprompt/css';
import '@/app/globals.css';

import Link from 'next/link';

import { Icons } from '@/components/icons';
import { Providers } from '@/components/providers';
import { Search } from '@/components/search';
import { cn } from '@/lib/utils';

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Markprompt',
    template: `%s - Markprompt`,
  },
  description:
    'An AI-powered ticket deflector and automatic case generation form, built with Markprompt.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
        )}
      >
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col">
            <div className="flex flex-row gap-4 items-center pb-4 px-8 py-4">
              {process.env.NEXT_PUBLIC_LOGO_ID ? (
                <Link
                  className="flex-none hover:opacity-50 transition"
                  href="https://github.com/markprompt/templates/tree/main/ticket-deflector"
                >
                  <img
                    className={
                      process.env.NEXT_PUBLIC_LOGO_HEIGHT_PX
                        ? undefined
                        : process.env.NEXT_PUBLIC_LOGO_CLASS ?? 'h-6'
                    }
                    style={{
                      height: process.env.NEXT_PUBLIC_LOGO_HEIGHT_PX
                        ? `${process.env.NEXT_PUBLIC_LOGO_HEIGHT_PX}px`
                        : undefined,
                    }}
                    src={`/logos/${process.env.NEXT_PUBLIC_LOGO_ID}.svg`}
                    alt="Logo"
                  />
                </Link>
              ) : (
                process.env.NEXT_PUBLIC_LOGO_URL && (
                  <Link
                    className="flex-none hover:opacity-50 transition"
                    href="https://github.com/markprompt/templates/tree/main/ticket-deflector"
                  >
                    <img
                      className={
                        process.env.NEXT_PUBLIC_LOGO_HEIGHT_PX
                          ? undefined
                          : process.env.NEXT_PUBLIC_LOGO_CLASS ?? 'h-6'
                      }
                      style={{
                        height: process.env.NEXT_PUBLIC_LOGO_HEIGHT_PX
                          ? `${process.env.NEXT_PUBLIC_LOGO_HEIGHT_PX}px`
                          : undefined,
                      }}
                      src={process.env.NEXT_PUBLIC_LOGO_URL}
                      alt="Logo"
                    />
                  </Link>
                )
              )}
              {process.env.NEXT_PUBLIC_TITLE && (
                <p className="font-medium text-sm">
                  {process.env.NEXT_PUBLIC_TITLE}
                </p>
              )}
              <div className="flex-grow" />
              {process.env.NEXT_PUBLIC_INCLUDE_SEARCH === 'true' && <Search />}
              {process.env.NEXT_PUBLIC_SHOW_GITHUB === 'true' && (
                <Link
                  className="hover:opacity-50 transition"
                  href="https://github.com/markprompt/templates/tree/main/ticket-deflector"
                >
                  <Icons.github className="w-5 h-5" />
                </Link>
              )}
            </div>
            <main className="flex flex-col flex-1 bg-muted/50 mx-auto max-w-screen-md w-full pt-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
