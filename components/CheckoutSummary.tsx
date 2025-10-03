'use client';

import { useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CheckoutSummaryProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CheckoutSummary({ items, onUpdateQuantity, onRemoveItem }: CheckoutSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1000 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-6">Résumé de la commande</h2>
      
      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-b-0">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-yellow-600 font-semibold">{item.price.toLocaleString()} MAD</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
              >
                <i className="ri-subtract-line text-sm"></i>
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 cursor-pointer"
              >
                <i className="ri-add-line text-sm"></i>
              </button>
            </div>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-delete-bin-line"></i>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-3 border-t pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Sous-total</span>
          <span>{subtotal.toLocaleString()} MAD</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Livraison</span>
          <span>{shipping === 0 ? 'Gratuite' : `${shipping} MAD`}</span>
        </div>
        {subtotal >= 1000 && (
          <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
            🎉 Livraison gratuite appliquée !
          </div>
        )}
        <div className="flex justify-between text-lg font-semibold text-gray-900 border-t pt-3">
          <span>Total</span>
          <span>{total.toLocaleString()} MAD</span>
        </div>
      </div>
    </div>
  );
}