
'use client'

import { useState } from 'react'

export default function WhatsAppFloat() {
  const [isVisible, setIsVisible] = useState(true)

  const handleWhatsAppClick = () => {
    const phoneNumber = '212661180440'
    const message = 'مرحباً، أريد الاستفسار عن منتجاتكم'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
        aria-label="تواصل معنا عبر واتساب"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-whatsapp-line text-xl"></i>
        </div>
      </button>
      
      <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <p className="text-sm text-gray-700 font-medium">تواصل معنا عبر واتساب</p>
        <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-gray-200"></div>
      </div>
    </div>
  )
}