
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutSteps from '@/components/CheckoutSteps';
import CheckoutForm from '@/components/CheckoutForm';
import CheckoutSummary from '@/components/CheckoutSummary';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Bague Solitaire Diamant',
      price: 15500,
      quantity: 1,
      image: 'https://readdy.ai/api/search-image?query=elegant%20diamond%20solitaire%20ring%20on%20white%20background%2C%20luxury%20jewelry%20photography%2C%20professional%20lighting%2C%20clean%20minimalist%20style%2C%20high-end%20jewelry%20store%20display&width=400&height=400&seq=1&orientation=squarish',
      category: 'Bagues'
    },
    {
      id: '2',
      name: 'Collier Perles Akoya',
      price: 8900,
      quantity: 1,
      image: 'https://readdy.ai/api/search-image?query=elegant%20akoya%20pearl%20necklace%20on%20white%20background%2C%20luxury%20jewelry%20photography%2C%20professional%20lighting%2C%20clean%20minimalist%20style%2C%20high-end%20jewelry%20store%20display&width=400&height=400&seq=2&orientation=squarish',
      category: 'Colliers'
    }
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleOrderSubmit = async (formData: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setOrderConfirmed(true);
      setCurrentStep(4);
    }, 2000);
  };

  if (orderConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CheckoutSteps currentStep={currentStep} />
        
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-check-line text-2xl text-green-600"></i>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Merci pour votre confiance !
              </h1>
              
              <p className="text-gray-600 mb-6">
                Votre commande a été reçue avec succès. Notre équipe va traiter votre demande 
                et vous envoyer vos produits le plus vite possible.
              </p>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-time-line text-yellow-600"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-yellow-800 mb-1">Livraison rapide</h3>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Traitement immédiat de votre commande</li>
                      <li>• Expédition dans les plus brefs délais</li>
                      <li>• Livraison sécurisée à votre adresse</li>
                      <li>• Suivi de commande par téléphone</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-phone-line text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-blue-800 mb-1">Contact direct</h3>
                    <p className="text-sm text-blue-700">
                      Notre équipe vous contactera au <strong>0661 18 04 40</strong> pour 
                      confirmer les détails et organiser la livraison.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/"
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Retour à l'accueil
                </Link>
                <Link 
                  href="/contact"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-shopping-cart-line text-2xl text-gray-400"></i>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Votre panier est vide
              </h1>
              
              <p className="text-gray-600 mb-6">
                Découvrez notre collection de bijoux et montres de luxe.
              </p>
              
              <Link 
                href="/bijoux"
                className="inline-block px-6 py-3 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Découvrir nos bijoux
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CheckoutSteps currentStep={currentStep} />
      
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Finaliser votre commande</h1>
            <p className="text-gray-600 mt-1">
              Vérifiez vos articles et renseignez vos informations de livraison
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm 
                onSubmit={handleOrderSubmit}
                isLoading={isLoading}
                submitUrl="https://readdy.ai/api/form/submit/checkout-order"
              />
            </div>
            
            <div className="lg:col-span-1">
              <CheckoutSummary 
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
              
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-shield-check-line text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Achat sécurisé</h3>
                    <p className="text-sm text-blue-700">
                      Vos informations sont protégées et votre commande sera traitée 
                      avec le plus grand soin par notre équipe.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                    <i className="ri-truck-line text-green-600"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800 mb-1">Livraison gratuite</h3>
                    <p className="text-sm text-green-700">
                      Livraison gratuite pour toute commande supérieure à 1000 MAD
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
