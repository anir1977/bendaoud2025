
'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-['Pacifico'] text-gray-800">
            Ben Daoud Bijouterie
          </Link>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
              Accueil
            </Link>
            <Link href="/bijoux" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
              Bijoux
            </Link>
            <Link href="/montres" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
              Montres
            </Link>
            <Link href="/marques" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
              Marques
            </Link>
            <Link href="/a-propos" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
              À Propos
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/recherche" className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-search-line text-xl"></i>
              </div>
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
                Accueil
              </Link>
              <Link href="/bijoux" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
                Bijoux
              </Link>
              <Link href="/montres" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
                Montres
              </Link>
              <Link href="/marques" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
                Marques
              </Link>
              <Link href="/a-propos" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
                À Propos
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-yellow-600 transition-colors cursor-pointer">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
