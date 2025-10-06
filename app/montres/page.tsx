
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';

const brands = ['Toutes', 'Guess', 'Festina', 'Tissot', 'Daniel Klein', 'Calvin Klein', 'Just Cavalli', 'Guess Collection'];

const products = [
  {
    id: "1",
    title: "Montre Tissot PRC 200",
    price: 4800,
    image: "https://readdy.ai/api/search-image?query=Tissot%20PRC%20200%20luxury%20watch%2C%20stainless%20steel%20case%20with%20black%20dial%2C%20Swiss%20made%20timepiece%2C%20professional%20watch%20photography%20on%20dark%20background%2C%20sophisticated%20and%20elegant%20presentation&width=300&height=300&seq=montres1&orientation=squarish",
    brand: "Tissot",
    slug: "montre-tissot-prc-200"
  },
  {
    id: "2",
    title: "Montre Guess Collection",
    price: 2400,
    image: "https://readdy.ai/api/search-image?query=Guess%20Collection%20luxury%20watch%20for%20women%2C%20elegant%20design%20with%20crystals%2C%20fashion%20timepiece%20on%20sophisticated%20background%2C%20professional%20watch%20photography%2C%20modern%20and%20stylish%20presentation&width=300&height=300&seq=montres2&orientation=squarish",
    brand: "Guess Collection",
    slug: "montre-guess-collection"
  },
  {
    id: "3",
    title: "Festina Chronograph",
    price: 3200,
    image: "https://readdy.ai/api/search-image?query=Festina%20chronograph%20watch%2C%20sporty%20design%20with%20multiple%20subdials%2C%20stainless%20steel%20case%2C%20professional%20watch%20photography%20on%20dark%20background%2C%20modern%20and%20dynamic%20presentation&width=300&height=300&seq=montres3&orientation=squarish",
    brand: "Festina",
    slug: "festina-chronograph"
  },
  {
    id: "4",
    title: "Calvin Klein Minimal",
    price: 1800,
    image: "https://readdy.ai/api/search-image?query=Calvin%20Klein%20minimal%20watch%2C%20clean%20design%20with%20white%20dial%2C%20leather%20strap%2C%20elegant%20timepiece%20on%20sophisticated%20background%2C%20professional%20watch%20photography%2C%20modern%20and%20minimalist&width=300&height=300&seq=montres4&orientation=squarish",
    brand: "Calvin Klein",
    slug: "calvin-klein-minimal"
  },
  {
    id: "5",
    title: "Guess Steel Classic",
    price: 2100,
    image: "https://readdy.ai/api/search-image?query=Guess%20classic%20steel%20watch%2C%20elegant%20design%20with%20blue%20dial%2C%20stainless%20steel%20bracelet%2C%20luxury%20timepiece%20on%20dark%20background%2C%20professional%20watch%20photography%2C%20sophisticated%20presentation&width=300&height=300&seq=montres5&orientation=squarish",
    brand: "Guess",
    slug: "guess-steel-classic"
  },
  {
    id: "6",
    title: "Daniel Klein Elegance",
    price: 1200,
    image: "https://readdy.ai/api/search-image?query=Daniel%20Klein%20elegant%20watch%2C%20classic%20design%20with%20gold%20accents%2C%20leather%20strap%2C%20luxury%20timepiece%20on%20sophisticated%20background%2C%20professional%20watch%20photography%2C%20timeless%20and%20elegant&width=300&height=300&seq=montres6&orientation=squarish",
    brand: "Daniel Klein",
    slug: "daniel-klein-elegance"
  },
  {
    id: "7",
    title: "Just Cavalli Fashion",
    price: 2800,
    image: "https://readdy.ai/api/search-image?query=Just%20Cavalli%20fashion%20watch%2C%20bold%20design%20with%20animal%20print%20details%2C%20luxury%20timepiece%20on%20dark%20background%2C%20professional%20watch%20photography%2C%20fashionable%20and%20distinctive%20presentation&width=300&height=300&seq=montres7&orientation=squarish",
    brand: "Just Cavalli",
    slug: "just-cavalli-fashion"
  },
  {
    id: "8",
    title: "Tissot Seastar Automatic",
    price: 6200,
    image: "https://readdy.ai/api/search-image?query=Tissot%20Seastar%20automatic%20watch%2C%20diving%20watch%20with%20rotating%20bezel%2C%20Swiss%20made%20timepiece%2C%20professional%20watch%20photography%20on%20dark%20background%2C%20sporty%20and%20robust%20presentation&width=300&height=300&seq=montres8&orientation=squarish",
    brand: "Tissot",
    slug: "tissot-seastar-automatic"
  }
];

export default function MontresPage() {
  const [selectedBrand, setSelectedBrand] = useState('Toutes');
  const [sortBy, setSortBy] = useState('newest');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const filteredProducts = products
    .filter(product => selectedBrand === 'Toutes' || product.brand === selectedBrand)
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
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Montres de Marques
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Collection exclusive de montres des plus grandes marques internationales
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-6 items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marque</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 pr-8 cursor-pointer"
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
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
              {filteredProducts.length} montre{filteredProducts.length > 1 ? 's' : ''} trouvée{filteredProducts.length > 1 ? 's' : ''}
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
                    <span className="bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                      {product.brand}
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
                      {product.brand}
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
