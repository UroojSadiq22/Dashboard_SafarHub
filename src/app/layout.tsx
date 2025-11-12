
'use client';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { usePathname } from 'next/navigation';
import { Inter, Oswald } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';


const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontOswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
});

// export const metadata: Metadata = {
//   title: 'SafarHub - All-in-One Travel Agent Marketplace',
//   description: 'Compare travel agents, view packages, read reviews, and book your next adventure.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith('/dashboard') || pathname === '/login' || pathname === '/signup';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>SafarHub - All-in-One Travel Agent Marketplace</title>
        <meta name="description" content="Compare travel agents, view packages, read reviews, and book your next adventure." />
      </head>
      <body className={cn("min-h-screen bg-background font-body antialiased flex flex-col", fontInter.variable, fontOswald.variable)}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {!hideHeaderFooter && <Header />}
            <main className="flex-1">{children}</main>
            {!hideHeaderFooter && <Footer />}
            <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}
