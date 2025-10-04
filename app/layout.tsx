import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ben Daoud Bijouterie - Bijoux et Montres de Luxe',
  description:
    'Découvrez notre collection exclusive de bijoux et montres de luxe. Ben Daoud Bijouterie, votre référence en joaillerie au Maroc.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Providers>
          {children}
          <WhatsAppFloat />

          {/* سكربت Readdy – بصيغة بسيطة ومباشرة */}
          <script
            async
            src="https://readdy.ai/api/public/assistant/widget?projectId=d3087de5-f4ca-4f7f-8c62-b101240008b1"
            // إن كانت المنصة تتطلب خصائص إضافية يمكن تمريرها كـ data-attributes
            data-strategy="afterInteractive"
            data-mode="hybrid"
            data-voice-show-transcript="true"
            data-theme="light"
            data-size="compact"
            data-accent-color="#14B8A6"
            data-button-base-color="#000000"
            data-button-accent-color="#FFFFFF"
            data-main-label=""
          />
        </Providers>
      </body>
    </html>
  );
}
