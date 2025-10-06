
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import productsData from '@/lib/products-data.json'

interface Product {
  id: string
  slug: string
  title: string
  brand: string
  description: string
  price_mad: number
  images: string[]
  type: string
  is_published: boolean
}

export default function ProduitsPage() {
  // Utiliser les données statiques du fichier JSON pour l'export statique
  const products = productsData.filter((product: Product) => 
    product.type === 'product' && product.is_published
  )

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Nos Produits
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre collection exclusive de bijoux en or 18 carats et de montres de prestige. 
              Chaque pièce est sélectionnée pour sa qualité exceptionnelle et son élégance intemporelle.
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {!products || products.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                  <i className="ri-store-3-line text-3xl text-gray-400"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Aucun produit disponible
                </h3>
                <p className="text-gray-600">
                  Nos produits seront bientôt disponibles. Revenez nous voir prochainement.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product: Product) => (
                  <Link 
                    key={product.id} 
                    href={`/produit/${product.slug}`}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {/* Product Image */}
                      <div className="aspect-square relative overflow-hidden bg-gray-100">
                        {product.images && product.images.length > 0 ? (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <i className="ri-image-line text-4xl text-gray-400"></i>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="mb-2">
                          <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">
                            {product.brand}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-amber-600">
                            {product.price_mad.toLocaleString('fr-MA')} MAD
                          </span>
                          <span className="text-amber-600 group-hover:text-amber-700 transition-colors">
                            <i className="ri-arrow-right-line text-lg"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Nos experts sont là pour vous conseiller et vous aider à trouver la pièce parfaite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
              >
                Nous contacter
              </Link>
              <Link
                href="/magasin"
                className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
              >
                Visiter notre magasin
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
