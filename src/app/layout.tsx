
'use client';

import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { usePathname } from 'next/navigation';

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
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>SafarHub - All-in-One Travel Agent Marketplace</title>
        <meta name="description" content="Compare travel agents, view packages, read reviews, and book your next adventure." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <FirebaseClientProvider>
          {!isDashboard && <Header />}
          <main className="flex-1">{children}</main>
          {!isDashboard && <Footer />}
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
