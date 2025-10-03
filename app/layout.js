export const metadata = { title: 'Ben Daoud Bijouterie' };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: 'system-ui, Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
