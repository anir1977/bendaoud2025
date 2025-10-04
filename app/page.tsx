import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Bienvenue chez Ben Daoud Bijouterie</h1>
      <p>Découvrez nos bijoux en or 18 carats, montres de luxe et collections uniques.</p>
      
      <nav>
        <ul>
          <li><Link href="/bijoux">Nos Bijoux</Link></li>
          <li><Link href="/montres">Montres</Link></li>
          <li><Link href="/magasin">Magasin</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/a-propos">À propos</Link></li>
        </ul>
      </nav>
    </main>
  );
}
