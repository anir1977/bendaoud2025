
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Product {
  id: string
  title: string
  slug: string
  brand?: string
  priceMAD: number
  images: string[]
  status: 'ACTIVE' | 'HIDDEN'
  categoryId: string
  metalColor?: string
  carat?: string
  description: string
}

interface Category {
  id: string
  name: string
  type: 'Bijoux' | 'Montres'
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const categories: Category[] = [
    { id: '1', name: 'Bagues', type: 'Bijoux' },
    { id: '2', name: 'Solitaires', type: 'Bijoux' },
    { id: '3', name: 'Bracelets', type: 'Bijoux' },
    { id: '4', name: 'Colliers', type: 'Bijoux' },
    { id: '5', name: 'Tissot', type: 'Montres' },
    { id: '6', name: 'Guess', type: 'Montres' },
    { id: '7', name: 'Festina', type: 'Montres' }
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    try {
      const savedProducts = JSON.parse(localStorage.getItem('products') || '[]')
      
      if (savedProducts.length === 0) {
        const defaultProducts: Product[] = [
          {
            id: '1',
            title: 'Bague Solitaire Diamant Or 18K',
            slug: 'bague-solitaire-diamant-or-18k',
            priceMAD: 15000,
            images: ['https://readdy.ai/api/search-image?query=elegant%20diamond%20solitaire%20ring%2018k%20gold%20luxury%20jewelry%20simple%20white%20background&width=400&height=400&seq=1&orientation=squarish'],
            status: 'ACTIVE',
            categoryId: '2',
            metalColor: 'Or jaune',
            carat: '18K',
            description: 'Magnifique bague solitaire en or 18 carats sertie d\'un diamant brillant.'
          },
          {
            id: '2',
            title: 'Montre Tissot PRC 200',
            slug: 'montre-tissot-prc-200',
            brand: 'Tissot',
            priceMAD: 2800,
            images: ['https://readdy.ai/api/search-image?query=Tissot%20PRC%20200%20luxury%20swiss%20watch%20stainless%20steel%20black%20dial%20professional%20photography%20white%20background&width=400&height=400&seq=2&orientation=squarish'],
            status: 'ACTIVE',
            categoryId: '5',
            description: 'Montre Tissot PRC 200, symbole de précision suisse et d\'élégance sportive.'
          },
          {
            id: '3',
            title: 'Collier Perles Or Jaune 18K',
            slug: 'collier-perles-or-jaune-18k',
            priceMAD: 8500,
            images: ['https://readdy.ai/api/search-image?query=elegant%20gold%20pearl%20necklace%2018k%20yellow%20gold%20luxury%20jewelry%20pearls%20simple%20white%20background&width=400&height=400&seq=3&orientation=squarish'],
            status: 'ACTIVE',
            categoryId: '4',
            metalColor: 'Or jaune',
            carat: '18K',
            description: 'Collier en perles et or 18 carats d\'une élégance exceptionnelle.'
          }
        ]
        localStorage.setItem('products', JSON.stringify(defaultProducts))
        setProducts(defaultProducts.filter(p => p.status === 'ACTIVE').slice(0, 6))
      } else {
        const activeProducts = savedProducts.filter((p: Product) => p.status === 'ACTIVE').slice(0, 6)
        setProducts(activeProducts)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProductCategory = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || { name: 'Non défini', type: 'Bijoux' }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
          {products.map((product) => {
            const category = getProductCategory(product.categoryId)
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
                      {category.name}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-yellow-600">
                      {formatPrice(product.priceMAD)}
                    </span>
                    {product.metalColor && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.metalColor}
                      </span>
                    )}
                    {product.brand && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.brand}
                      </span>
                    )}
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
            )
          })}
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
            href="/bijoux"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            Voir Tous les Produits
          </Link>
        </div>
      </div>
    </section>
  );
}
