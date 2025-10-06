
'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import Link from 'next/link';

const categories = [
  'Tous', 'Bague', 'Solitaire', 'Bracelet', 'Gourmette', 'Collier', 'Ensemble', 'Parure', 'Sautoir', 'Boucle'
];

const metalColors = ['Tous', 'Or jaune', 'Or blanc', 'Or rose'];

const products = [
  {
    id: "1",
    title: "Bague Solitaire Diamant Or 18K",
    price: 8500,
    image: "https://readdy.ai/api/search-image?query=Elegant%20diamond%20solitaire%20ring%20in%2018k%20gold%2C%20single%20brilliant%20cut%20diamond%2C%20classic%20engagement%20ring%20design%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20luxury%20and%20sophistication&width=300&height=300&seq=bijoux1&orientation=squarish",
    category: "Solitaire",
    metalColor: "Or jaune",
    slug: "bague-solitaire-diamant-or-18k"
  },
  {
    id: "2",
    title: "Collier Chaîne Or 18K",
    price: 3200,
    image: "https://readdy.ai/api/search-image?query=Beautiful%2018k%20gold%20chain%20necklace%2C%20elegant%20design%20with%20delicate%20links%2C%20luxury%20gold%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20warm%20golden%20lighting&width=300&height=300&seq=bijoux2&orientation=squarish",
    category: "Collier",
    metalColor: "Or jaune",
    slug: "collier-chaine-or-18k"
  },
  {
    id: "3",
    title: "Bracelet Gourmette Or 18K",
    price: 2800,
    image: "https://readdy.ai/api/search-image?query=18k%20gold%20curb%20chain%20bracelet%2C%20classic%20gourmette%20design%2C%20luxury%20gold%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20warm%20golden%20lighting%2C%20elegant%20and%20sophisticated&width=300&height=300&seq=bijoux3&orientation=squarish",
    category: "Gourmette",
    metalColor: "Or jaune",
    slug: "bracelet-gourmette-or-18k"
  },
  {
    id: "4",
    title: "Boucles d'Oreilles Or 18K",
    price: 1800,
    image: "https://readdy.ai/api/search-image?query=Elegant%2018k%20gold%20earrings%2C%20classic%20design%20with%20small%20diamonds%2C%20luxury%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20warm%20golden%20lighting%2C%20sophisticated%20and%20timeless&width=300&height=300&seq=bijoux4&orientation=squarish",
    category: "Boucle",
    metalColor: "Or jaune",
    slug: "boucles-oreilles-or-18k"
  },
  {
    id: "5",
    title: "Alliance Or Blanc 18K",
    price: 2200,
    image: "https://readdy.ai/api/search-image?query=White%20gold%20wedding%20band%2018k%2C%20elegant%20simple%20design%2C%20luxury%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20sophisticated%20and%20timeless%2C%20clean%20minimalist%20style&width=300&height=300&seq=bijoux5&orientation=squarish",
    category: "Bague",
    metalColor: "Or blanc",
    slug: "alliance-or-blanc-18k"
  },
  {
    id: "6",
    title: "Parure Complète Or Rose",
    price: 6500,
    image: "https://readdy.ai/api/search-image?query=Complete%20rose%20gold%20jewelry%20set%20with%20matching%20necklace%2C%20earrings%2C%20bracelet%20in%2018k%20rose%20gold%2C%20coordinated%20jewelry%20collection%20on%20elegant%20background%2C%20professional%20luxury%20jewelry%20photography&width=300&height=300&seq=bijoux6&orientation=squarish",
    category: "Parure",
    metalColor: "Or rose",
    slug: "parure-complete-or-rose"
  },
  {
    id: "7",
    title: "Sautoir Perles Or 18K",
    price: 4200,
    image: "https://readdy.ai/api/search-image?query=Long%20pearl%20necklace%20with%2018k%20gold%20elements%2C%20elegant%20sautoir%20design%2C%20luxury%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20sophisticated%20and%20classic&width=300&height=300&seq=bijoux7&orientation=squarish",
    category: "Sautoir",
    metalColor: "Or jaune",
    slug: "sautoir-perles-or-18k"
  },
  {
    id: "8",
    title: "Ensemble Bague et Boucles",
    price: 3800,
    image: "https://readdy.ai/api/search-image?query=Matching%20ring%20and%20earrings%20set%20in%2018k%20gold%20with%20diamonds%2C%20coordinated%20jewelry%20ensemble%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20luxury%20and%20elegance&width=300&height=300&seq=bijoux8&orientation=squarish",
    category: "Ensemble",
    metalColor: "Or jaune",
    slug: "ensemble-bague-boucles"
  },
  {
    id: "9",
    title: "Bracelet Tennis Diamants",
    price: 12500,
    image: "https://readdy.ai/api/search-image?query=Diamond%20tennis%20bracelet%20in%2018k%20white%20gold%2C%20continuous%20line%20of%20brilliant%20diamonds%2C%20luxury%20jewelry%20on%20white%20background%2C%20professional%20jewelry%20photography%2C%20sophisticated%20and%20elegant&width=300&height=300&seq=bijoux9&orientation=squarish",
    category: "Bracelet",
    metalColor: "Or blanc",
    slug: "bracelet-tennis-diamants"
  }
];

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
