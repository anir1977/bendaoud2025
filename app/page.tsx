export const dynamic = 'error' // نفرض التوليد الساكن 100%

export default function Page() {
  return (
    <main style={{padding: '2rem'}}>
      <h1 style={{fontSize: '2.25rem', fontWeight: 700}}>
        Ben Daoud Bijouterie
      </h1>
      <p style={{marginTop: '1rem'}}>
        Bienvenue sur notre boutique. Ceci est un test pour vérifier le rendu statique sur Vercel.
      </p>
      <ul style={{marginTop: '1rem', lineHeight: 1.8}}>
        <li><a href="/bijoux">Bijoux</a></li>
        <li><a href="/montres">Montres</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </main>
  );
}
