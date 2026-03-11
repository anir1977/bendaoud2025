
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductDetail from './ProductDetail'
import productsData from '@/lib/products-data.json'

const LEGACY_SLUG_ALIASES: Record<string, string> = {
  'collier-chaine-or-18k': 'collier-perles-or-rose-18k',
  'bracelet-gourmette-or-18k': 'gourmette-or-rose-18k-homme',
  'boucles-oreilles-or-18k': 'boucles-oreilles-diamants-or-blanc',
  'alliance-or-blanc-18k': 'alliance-or-jaune-18k-classique',
  'parure-complete-or-rose': 'parure-complete-or-jaune-18k',
  'sautoir-perles-or-18k': 'sautoir-chaine-or-blanc-18k',
  'ensemble-bague-boucles': 'bague-solitaire-diamant-or-18k',
  'bracelet-tennis-diamants': 'bracelet-tennis-diamants-or-blanc',
}

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
  const productSlugs = productsData
    .filter((product) => product.type === 'product' && product.is_published)
    .map((product) => ({ slug: product.slug }))

  const aliasSlugs = Object.keys(LEGACY_SLUG_ALIASES).map((slug) => ({ slug }))

  return [...productSlugs, ...aliasSlugs]
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const resolvedSlug = LEGACY_SLUG_ALIASES[params.slug] || params.slug

  // Utiliser les données statiques du fichier JSON pour l'export statique
  const product = productsData.find(p => p.slug === resolvedSlug && p.is_published)

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
