
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';
import productsData from '@/lib/products-data.json';

interface CatalogProduct {
  slug: string;
  title: string;
  price_mad: number;
  images: string[];
  type: string;
  is_published: boolean;
  category_slug: string;
}

const JEWELRY_CATEGORIES = new Set([
  'bagues',
  'bracelets',
  'gourmettes',
  'colliers',
  'parures',
  'sautoirs',
  'boucles',
]);

const categoryLabels: Record<string, string> = {
  bagues: 'Bague',
  bracelets: 'Bracelet',
  gourmettes: 'Gourmette',
  colliers: 'Collier',
  parures: 'Parure',
  sautoirs: 'Sautoir',
  boucles: 'Boucle',
};

const detectMetalColor = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('or blanc')) return 'Or blanc';
  if (lowerTitle.includes('or rose')) return 'Or rose';
  if (lowerTitle.includes('or jaune')) return 'Or jaune';
  return 'Or 18K';
};

const products = (productsData as CatalogProduct[])
  .filter((product) => product.type === 'product' && product.is_published)
  .filter((product) => JEWELRY_CATEGORIES.has(product.category_slug))
  .map((product) => ({
    id: product.slug,
    title: product.title,
    price: product.price_mad,
    image: product.images[0] || '/placeholder-product.jpg',
    category: categoryLabels[product.category_slug] || 'Bijou',
    metalColor: detectMetalColor(product.title),
    slug: product.slug,
  }));

const categories = ['Tous', ...new Set(products.map((product) => product.category))];
const metalColors = ['Tous', ...new Set(products.map((product) => product.metalColor))];

export default function BijouxPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [selectedMetal, setSelectedMetal] = useState('Tous');
  const [sortBy, setSortBy] = useState('newest');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredProducts = products
    .filter(product => selectedCategory === 'Tous' || product.category === selectedCategory)
    .filter(product => selectedMetal === 'Tous' || product.metalColor === selectedMetal)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <WhatsAppFloat />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Bijoux en Or 18 Carats
          </h1>
          <p className="text-xl text-black/80 max-w-2xl mx-auto">
            Découvrez notre collection exclusive de bijoux en or 18 carats, alliant tradition et modernité
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 pr-8 cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Couleur d'or</label>
                <select
                  value={selectedMetal}
                  onChange={(e) => setSelectedMetal(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 pr-8 cursor-pointer"
                >
                  {metalColors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trier par</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 pr-8 cursor-pointer"
                >
                  <option value="newest">Nouveautés</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>
            
            <div className="text-gray-600">
              {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-product-shop>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-500 text-black text-xs font-semibold px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-yellow-600">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.metalColor}
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
