
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetail from './ProductDetail'
import productsData from '@/lib/products-data.json'

interface Product {
  id?: string
  slug: string
  title: string
  brand: string
  description: string
  price_mad: number
  images: string[]
  type: string
  is_published: boolean
}

export async function generateStaticParams() {
  // استخدام الـ slugs الفعلية من ملف البيانات
  return [
    { slug: 'bague-solitaire-diamant-or-18k' },
    { slug: 'alliance-or-jaune-18k-classique' },
    { slug: 'bracelet-maille-or-blanc-18k' },
    { slug: 'gourmette-or-rose-18k-homme' },
    { slug: 'collier-perles-or-rose-18k' },
    { slug: 'parure-complete-or-jaune-18k' },
    { slug: 'sautoir-chaine-or-blanc-18k' },
    { slug: 'boucles-oreilles-diamants-or-blanc' },
    { slug: 'bague-emeraude-or-jaune-18k' },
    { slug: 'bracelet-tennis-diamants-or-blanc' },
    { slug: 'montre-tissot-prc-200-homme' },
    { slug: 'montre-guess-femme-dore' },
    { slug: 'montre-festina-chronographe-sport' },
    { slug: 'montre-tissot-seastar-automatique' },
    { slug: 'montre-guess-homme-chronographe' },
    { slug: 'montre-festina-femme-elegance' }
  ]
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Utiliser les données statiques du fichier JSON pour l'export statique
  const product = productsData.find(p => p.slug === params.slug && p.is_published)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <ProductDetail product={product} />
      <Footer />
    </div>
  )
}
