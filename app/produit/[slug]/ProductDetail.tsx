
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const handleWhatsAppContact = () => {
    const message = `Bonjour, je suis intéressé(e) par le produit: ${product.title} - ${product.price_mad.toLocaleString('fr-MA')} MAD`
    const whatsappUrl = `https://wa.me/212600000000?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShare = () => {
    const currentUrl = window.location.href
    const shareData = {
      title: product.title,
      text: `Découvrez ce produit: ${product.title} - ${product.price_mad.toLocaleString('fr-MA')} MAD`,
      url: currentUrl
    }

    if (navigator.share) {
      navigator.share(shareData).catch(console.error)
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert('Lien copié dans le presse-papiers!')
      }).catch(() => {
        // Fallback pour les navigateurs plus anciens
        const textArea = document.createElement('textarea')
        textArea.value = currentUrl
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        alert('Lien copié dans le presse-papiers!')
      })
    }
  }

  return (
    <main className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-amber-600 transition-colors">
            Accueil
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link href="/produits" className="hover:text-amber-600 transition-colors">
            Produits
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <i className="ri-image-line text-6xl text-gray-400"></i>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative overflow-hidden rounded-lg border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-amber-600' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 25vw, 12.5vw"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">
                  {product.brand}
                </span>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Partager ce produit"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-share-line text-xl text-gray-600"></i>
                  </div>
                </button>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>
              <div className="text-3xl font-bold text-amber-600 mb-6">
                {product.price_mad.toLocaleString('fr-MA')} MAD
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                  Quantité:
                </label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50 transition-colors"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors whitespace-nowrap"
                >
                  <i className="ri-whatsapp-line text-xl"></i>
                  <span>Commander via WhatsApp</span>
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/contact"
                    className="border border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-6 py-3 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-phone-line"></i>
                    <span>Contact</span>
                  </Link>
                  
                  <button
                    onClick={handleShare}
                    className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors whitespace-nowrap"
                  >
                    <i className="ri-share-line"></i>
                    <span>Partager</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Caractéristiques
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <i className="ri-shield-check-line text-amber-600"></i>
                  <span className="text-gray-600">Garantie authentique</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-truck-line text-amber-600"></i>
                  <span className="text-gray-600">Livraison sécurisée</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-customer-service-2-line text-amber-600"></i>
                  <span className="text-gray-600">Service client expert</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="ri-exchange-line text-amber-600"></i>
                  <span className="text-gray-600">Échange possible sous conditions</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <section className="mt-16 pt-16 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Vous pourriez aussi aimer
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">
              Découvrez notre collection complète
            </p>
            <Link
              href="/produits"
              className="inline-flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium"
            >
              <span>Voir tous nos produits</span>
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
