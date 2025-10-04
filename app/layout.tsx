// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Ben Daoud Bijouterie',
  description: 'Bijouterie — Or 18 carats, diamants, collections et montres de prestige.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
