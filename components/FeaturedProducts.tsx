
'use client';

import Link from 'next/link';
import Image from 'next/image';
import productsData from '@/lib/products-data.json';

interface Product {
  slug: string
  title: string
  brand: string
  description: string
  price_mad: number
  images: string[]
  type: string
  is_published: boolean
}

export default function FeaturedProducts() {
  // استخدام البيانات من نفس الملف المستخدم في صفحات المنتجات
  const products = productsData
    .filter((product: Product) => product.type === 'product' && product.is_published)
    .slice(0, 6);

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('fr-MA')} MAD`;
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Produits en Vedette
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de bijoux et montres les plus populaires
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-product-shop>
          {products.map((product: Product) => (
            <div
              key={product.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative h-64 overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <i className="ri-image-line text-4xl text-gray-400"></i>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
                    {product.brand}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                  {product.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-yellow-600">
                    {formatPrice(product.price_mad)}
                  </span>
                </div>

                <div className="flex space-x-3">
                  <Link
                    href={`/produit/${product.slug}`}
                    className="flex-1 bg-gray-800 hover:bg-gray-900 text-white text-center py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Voir Détails
                  </Link>
                  <button
                    onClick={() => window.open(`https://wa.me/212661180440?text=Bonjour, j'aimerais avoir des informations sur: ${product.title}`, '_blank')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors cursor-pointer"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-whatsapp-line"></i>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-store-line text-gray-400 text-6xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit disponible</h3>
            <p className="text-gray-500">Les produits seront bientôt disponibles.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/produits"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Voir Tous les Produits
          </Link>
        </div>
      </div>
    </section>
  );
}
