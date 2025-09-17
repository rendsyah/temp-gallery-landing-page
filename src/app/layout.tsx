import type { Metadata } from 'next';
import { Lato, Playfair } from 'next/font/google';
import { Toaster } from 'sonner';
import { NetworkProvider } from '@/contexts/network.context';
import { GlobalProvider } from '@/contexts/global.context';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './globals.css';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
});

const playfair = Playfair({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Hays Gallery',
    template: '%s | Hays Gallery',
  },
  description: `Hays Gallery adalah galeri seni kontemporer yang menghadirkan pameran, koleksi eksklusif, dan pengalaman artistik bagi pecinta seni dan budaya.`,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://www.hays-gallery.com'),
  openGraph: {
    title: 'Hays Gallery',
    description: `Jelajahi pameran dan koleksi seni kontemporer eksklusif di Hays Gallery, ruang artistik untuk pecinta seni dan budaya.`,
    url: process.env.NEXT_PUBLIC_APP_BASE_URL,
    siteName: 'Hays Gallery',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Hays Gallery',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hays Gallery',
    description: `Hays Gallery menghadirkan koleksi seni kontemporer eksklusif dan pengalaman artistik berkelas bagi pecinta seni.`,
    images: ['/images/og-default.jpg'],
    creator: '@haysgallery',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_BASE_URL,
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="id" className={`${lato.className} ${playfair.className}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Hays Gallery',
              url: process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://www.hays-gallery.com',
            }),
          }}
        />
      </head>
      <body className="font-lato antialiased">
        <GlobalProvider>
          <NetworkProvider>
            <Toaster />
            {children}
          </NetworkProvider>
        </GlobalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
