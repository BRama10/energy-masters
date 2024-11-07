import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { cn } from '@/lib/utils';
import './globals.css';

import { Providers } from '@/components/providers';

import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Energy Masters Audit",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Energy Masters Audit App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        <Providers>
          <div className="relative min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-6 pb-24">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
