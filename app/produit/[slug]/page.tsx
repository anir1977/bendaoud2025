
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
  return productsData
    .filter((product) => product.type === 'product' && product.is_published)
    .map((product) => ({ slug: product.slug }))
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
