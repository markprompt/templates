import { Inter as FontSans, Fira_Code as FontMono } from 'next/font/google';

import '@/app/globals.css';
import { Providers } from '@/components/providers';
import { cn } from '@/lib/utils';

export const metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: {
    default: 'Markprompt Ticket Deflector',
    template: `%s - Markprompt Ticket Deflector`,
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
          'min-h-screen bg-background font-sans antialiased p-8',
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
            <main className="flex flex-col flex-1 bg-muted/50 mx-auto max-w-screen-md w-full">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
