import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ben Daoud Bijouterie - Bijoux et Montres de Luxe',
  description:
    'Découvrez notre collection exclusive de bijoux et montres de luxe. Ben Daoud Bijouterie, votre référence en joaillerie au Maroc.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          {children}
          <WhatsAppFloat />
          {/* استخدم next/script لسكربت Readdy */}
          <Script
            src="https://readdy.ai/api/public/assistant/widget?projectId=d3087de5-f4ca-4f7f-8c62-b101240008b1"
            strategy="afterInteractive"
          />
        </Providers>
      </body>
    </html>
  );
}
