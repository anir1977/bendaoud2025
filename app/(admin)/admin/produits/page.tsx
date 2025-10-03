
'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  slug: string
  brand?: string
  priceMAD: number
  images: string[]
  status: 'ACTIVE' | 'HIDDEN'
  categoryId: string
  createdAt: string
  description?: string
  tags?: string[]
  aiEnhanced?: boolean
  baseGoldPrice?: number
  goldWeight?: number
  laborCost?: number
}

interface Category {
  id: string
  name: string
  type: 'Bijoux' | 'Montres'
}

interface GoldPrices {
  current: number
  lastUpdate: string
  change: number
  changePercent: number
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [aiProcessing, setAiProcessing] = useState<string | null>(null)
  const [goldPrices, setGoldPrices] = useState<GoldPrices>({
    current: 650,
    lastUpdate: new Date().toISOString(),
    change: 15,
    changePercent: 2.3
  })
  const [showPriceUpdateModal, setShowPriceUpdateModal] = useState(false)
  const [newGoldPrice, setNewGoldPrice] = useState('')
  const [updatingPrices, setUpdatingPrices] = useState(false)

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
    fetchProducts()
    loadGoldPrices()
  }, [])

  const loadGoldPrices = () => {
    try {
      const savedPrices = localStorage.getItem('goldPrices')
      if (savedPrices) {
        setGoldPrices(JSON.parse(savedPrices))
      }
    } catch (error) {
      console.error('Erreur lors du chargement des prix de l\'or:', error)
    }
  }

  const saveGoldPrices = (prices: GoldPrices) => {
    localStorage.setItem('goldPrices', JSON.stringify(prices))
    setGoldPrices(prices)
  }

  const fetchProducts = async () => {
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
            createdAt: new Date().toISOString(),
            description: 'Magnifique bague solitaire en or 18 carats sertie d\'un diamant brillant de qualité exceptionnelle.',
            tags: ['diamant', 'or 18k', 'solitaire', 'luxe', 'mariage'],
            aiEnhanced: true,
            baseGoldPrice: 650,
            goldWeight: 3.5,
            laborCost: 8000
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
            createdAt: new Date().toISOString(),
            description: 'Montre Tissot PRC 200, symbole de précision suisse et d\'élégance sportive avec mouvement quartz.',
            tags: ['tissot', 'suisse', 'sport', 'étanche', 'quartz'],
            aiEnhanced: false
          },
          {
            id: '3',
            title: 'Collier Perles Or Jaune 18K',
            slug: 'collier-perles-or-jaune-18k',
            priceMAD: 8500,
            images: ['https://readdy.ai/api/search-image?query=elegant%20gold%20pearl%20necklace%2018k%20yellow%20gold%20luxury%20jewelry%20pearls%20simple%20white%20background&width=400&height=400&seq=3&orientation=squarish'],
            status: 'ACTIVE',
            categoryId: '4',
            createdAt: new Date().toISOString(),
            description: 'Collier en perles naturelles et or 18 carats d\'une élégance exceptionnelle pour toutes occasions.',
            tags: ['perles', 'or jaune', 'élégance', 'naturel', 'classique'],
            aiEnhanced: true,
            baseGoldPrice: 650,
            goldWeight: 5.2,
            laborCost: 4000
          }
        ]
        localStorage.setItem('products', JSON.stringify(defaultProducts))
        setProducts(defaultProducts)
      } else {
        setProducts(savedProducts)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateAllGoldPrices = async () => {
    if (!newGoldPrice || parseFloat(newGoldPrice) <= 0) {
      alert('Veuillez entrer un prix valide pour l\'or')
      return
    }

    setUpdatingPrices(true)
    
    try {
      const currentPrice = parseFloat(newGoldPrice)
      const oldPrice = goldPrices.current
      const change = currentPrice - oldPrice
      const changePercent = ((change / oldPrice) * 100)

      // Mise à jour des prix de l'or
      const newGoldPrices: GoldPrices = {
        current: currentPrice,
        lastUpdate: new Date().toISOString(),
        change: change,
        changePercent: changePercent
      }
      saveGoldPrices(newGoldPrices)

      // Mise à jour des prix des bijoux en or
      const updatedProducts = products.map(product => {
        const category = getProductCategory(product.categoryId)
        
        // Mise à jour seulement pour les bijoux avec données d'or
        if (category.type === 'Bijoux' && product.baseGoldPrice && product.goldWeight) {
          const goldCost = currentPrice * product.goldWeight
          const newPrice = goldCost + (product.laborCost || 0)
          
          return {
            ...product,
            priceMAD: Math.round(newPrice),
            baseGoldPrice: currentPrice
          }
        }
        
        return product
      })

      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      
      setShowPriceUpdateModal(false)
      setNewGoldPrice('')
      
      const bijouxUpdated = updatedProducts.filter(p => {
        const category = getProductCategory(p.categoryId)
        return category.type === 'Bijoux' && p.baseGoldPrice && p.goldWeight
      }).length

      alert(`Prix mis à jour avec succès!\n${bijouxUpdated} bijoux en or ont été recalculés.\n\nNote: Seuls les bijoux avec poids d'or configuré sont mis à jour automatiquement.`)
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour des prix:', error)
      alert('Erreur lors de la mise à jour des prix')
    } finally {
      setUpdatingPrices(false)
    }
  }

  const configureGoldPricing = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (!product) return

    const category = getProductCategory(product.categoryId)
    if (category.type !== 'Bijoux') {
      alert('Cette fonctionnalité est disponible uniquement pour les bijoux')
      return
    }

    const goldWeight = prompt('Entrez le poids d\'or en grammes:', '3.5')
    if (!goldWeight || parseFloat(goldWeight) <= 0) return

    const laborCost = prompt('Entrez le coût de main d\'œuvre (MAD):', '5000')
    if (!laborCost || parseFloat(laborCost) < 0) return

    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        const weight = parseFloat(goldWeight)
        const labor = parseFloat(laborCost)
        const goldCost = goldPrices.current * weight
        const newPrice = goldCost + labor

        return {
          ...p,
          goldWeight: weight,
          laborCost: labor,
          baseGoldPrice: goldPrices.current,
          priceMAD: Math.round(newPrice)
        }
      }
      return p
    })

    setProducts(updatedProducts)
    localStorage.setItem('products', JSON.stringify(updatedProducts))
    alert('Configuration du prix automatique activée!')
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      const updatedProducts = products.filter(p => p.id !== id)
      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
    }
  }

  const handleAiEnhancement = async (productId: string) => {
    setAiProcessing(productId)
    
    // Simulation d'amélioration IA
    setTimeout(() => {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          const category = getProductCategory(product.categoryId)
          const enhancedDescription = generateAiDescription(product, category)
          const enhancedTags = generateAiTags(product, category)
          
          return {
            ...product,
            description: enhancedDescription,
            tags: enhancedTags,
            aiEnhanced: true
          }
        }
        return product
      })
      
      setProducts(updatedProducts)
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      setAiProcessing(null)
    }, 2000)
  }

  const generateAiDescription = (product: Product, category: Category) => {
    const descriptions = {
      'Bijoux': [
        `${product.title} - Une pièce d'exception qui allie tradition artisanale et design contemporain. Chaque détail a été soigneusement pensé pour créer un bijou unique qui sublimera votre style avec élégance et raffinement.`,
        `Découvrez ${product.title}, un bijou d'une beauté intemporelle qui capture la lumière et les regards. Fabriqué avec les plus beaux matériaux, ce bijou est le symbole parfait de l'excellence et du savoir-faire artisanal.`,
        `${product.title} incarne l'art de la joaillerie dans sa forme la plus pure. Cette création exceptionnelle vous accompagnera dans vos moments les plus précieux, ajoutant une touche de luxe et d'élégance à votre quotidien.`
      ],
      'Montres': [
        `${product.title} - L'alliance parfaite entre précision horlogère et design sophistiqué. Cette montre de prestige vous accompagne au quotidien avec fiabilité et élégance, reflétant votre goût pour l'excellence.`,
        `Découvrez ${product.title}, une montre qui transcende le temps par son design intemporel et sa précision remarquable. Chaque composant a été sélectionné pour offrir une expérience horlogère d'exception.`,
        `${product.title} représente l'excellence de l'horlogerie moderne. Cette pièce unique combine innovation technique et esthétique raffinée pour créer un accessoire indispensable à votre style.`
      ]
    }
    
    const categoryDescriptions = descriptions[category.type] || descriptions['Bijoux']
    return categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)]
  }

  const generateAiTags = (product: Product, category: Category) => {
    const baseTags = {
      'Bijoux': ['bijoux', 'luxe', 'élégance', 'artisanal', 'précieux', 'raffinement', 'style', 'mode'],
      'Montres': ['montre', 'horlogerie', 'précision', 'temps', 'accessoire', 'style', 'qualité', 'design']
    }
    
    const specificTags = {
      'Bagues': ['bague', 'alliance', 'fiançailles', 'mariage'],
      'Solitaires': ['solitaire', 'diamant', 'engagement', 'unique'],
      'Bracelets': ['bracelet', 'poignet', 'charme', 'tendance'],
      'Colliers': ['collier', 'cou', 'pendentif', 'chaîne'],
      'Tissot': ['tissot', 'suisse', 'swiss made', 'qualité'],
      'Guess': ['guess', 'mode', 'tendance', 'moderne'],
      'Festina': ['festina', 'sport', 'résistant', 'performance']
    }
    
    const categoryBaseTags = baseTags[category.type] || baseTags['Bijoux']
    const categorySpecificTags = specificTags[category.name] || []
    
    const allTags = [...categoryBaseTags, ...categorySpecificTags]
    return allTags.slice(0, 6)
  }

  const openDescriptionModal = (product: Product) => {
    setSelectedProduct(product)
    setShowDescriptionModal(true)
  }

  const getProductCategory = (categoryId: string) => {
    return categories.find(c => c.id === categoryId) || { name: 'Non défini', type: 'Bijoux' }
  }

  const filteredProducts = products.filter(product => {
    const category = getProductCategory(product.categoryId)
    if (filter === 'all') return true
    if (filter === 'bijoux') return category.type === 'Bijoux'
    if (filter === 'montres') return category.type === 'Montres'
    if (filter === 'active') return product.status === 'ACTIVE'
    if (filter === 'hidden') return product.status === 'HIDDEN'
    return true
  })

  const bijouxCount = products.filter(p => getProductCategory(p.categoryId).type === 'Bijoux').length
  const montresCount = products.filter(p => getProductCategory(p.categoryId).type === 'Montres').length
  const goldProductsCount = products.filter(p => {
    const category = getProductCategory(p.categoryId)
    return category.type === 'Bijoux' && p.baseGoldPrice && p.goldWeight
  }).length

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
          <Link
            href="/admin/produits/nouveau"
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
          >
            <i className="ri-add-line mr-2"></i>
            Nouveau Produit
          </Link>
        </div>

        {/* Système de Prix de l'Or */}
        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-500 p-3 rounded-full">
                <i className="ri-money-dollar-circle-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Prix de l'Or 18K</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-yellow-600">
                    {goldPrices.current} MAD/g
                  </span>
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    goldPrices.change >= 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {goldPrices.change >= 0 ? '+' : ''}{goldPrices.change.toFixed(2)} MAD 
                    ({goldPrices.changePercent >= 0 ? '+' : ''}{goldPrices.changePercent.toFixed(1)}%)
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Dernière mise à jour: {new Date(goldPrices.lastUpdate).toLocaleDateString('fr-FR')} à {new Date(goldPrices.lastUpdate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm text-gray-600">Produits configurés</p>
                <p className="text-lg font-semibold text-gray-900">{goldProductsCount} / {bijouxCount} bijoux</p>
              </div>
              <button
                onClick={() => setShowPriceUpdateModal(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
              >
                <i className="ri-refresh-line mr-2"></i>
                Mettre à jour les prix
              </button>
            </div>
          </div>
          
          {goldProductsCount === 0 && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center">
                <i className="ri-information-line text-orange-600 mr-2"></i>
                <p className="text-sm text-orange-700">
                  Aucun bijou n'est configuré pour la mise à jour automatique. Utilisez le bouton "Configurer Prix Auto" sur vos bijoux pour activer cette fonctionnalité.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'all' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tous ({products.length})
            </button>
            <button
              onClick={() => setFilter('bijoux')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'bijoux' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Bijoux ({bijouxCount})
            </button>
            <button
              onClick={() => setFilter('montres')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'montres' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Montres ({montresCount})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'active' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Actifs ({products.filter(p => p.status === 'ACTIVE').length})
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredProducts.map((product) => {
              const category = getProductCategory(product.categoryId)
              const hasGoldPricing = category.type === 'Bijoux' && product.baseGoldPrice && product.goldWeight
              return (
                <li key={product.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 relative">
                          <img
                            className={`h-16 w-16 rounded-lg object-cover transition-all duration-300 ${
                              product.aiEnhanced ? 'ring-2 ring-blue-500 shadow-lg' : ''
                            }`}
                            src={product.images[0]}
                            alt={product.title}
                          />
                          {product.aiEnhanced && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                              <i className="ri-magic-line text-xs"></i>
                            </div>
                          )}
                          {hasGoldPricing && (
                            <div className="absolute -bottom-1 -left-1 bg-yellow-500 text-black rounded-full w-5 h-5 flex items-center justify-center">
                              <i className="ri-money-dollar-circle-line text-xs"></i>
                            </div>
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category.name} • {product.priceMAD.toLocaleString()} MAD
                            {hasGoldPricing && (
                              <span className="ml-2 text-yellow-600">
                                • {product.goldWeight}g d'or
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.status === 'ACTIVE' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.status === 'ACTIVE' ? 'Actif' : 'Masqué'}
                            </span>
                            {product.aiEnhanced && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <i className="ri-magic-line mr-1"></i>
                                IA Optimisé
                              </span>
                            )}
                            {hasGoldPricing && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                <i className="ri-money-dollar-circle-line mr-1"></i>
                                Prix Auto
                              </span>
                            )}
                          </div>
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {product.tags.slice(0, 3).map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {product.tags.length > 3 && (
                                <span className="text-xs text-gray-500">
                                  +{product.tags.length - 3} tags
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openDescriptionModal(product)}
                          className="text-blue-600 hover:text-blue-900 text-sm font-medium whitespace-nowrap"
                        >
                          <i className="ri-file-text-line mr-1"></i>
                          Description
                        </button>
                        {category.type === 'Bijoux' && !hasGoldPricing && (
                          <button
                            onClick={() => configureGoldPricing(product.id)}
                            className="text-yellow-600 hover:text-yellow-900 text-sm font-medium whitespace-nowrap"
                          >
                            <i className="ri-settings-3-line mr-1"></i>
                            Configurer Prix Auto
                          </button>
                        )}
                        {!product.aiEnhanced && (
                          <button
                            onClick={() => handleAiEnhancement(product.id)}
                            disabled={aiProcessing === product.id}
                            className="text-purple-600 hover:text-purple-900 text-sm font-medium whitespace-nowrap disabled:opacity-50"
                          >
                            {aiProcessing === product.id ? (
                              <>
                                <i className="ri-loader-4-line mr-1 animate-spin"></i>
                                Traitement...
                              </>
                            ) : (
                              <>
                                <i className="ri-magic-line mr-1"></i>
                                Optimiser IA
                              </>
                            )}
                          </button>
                        )}
                        <Link
                          href={`/admin/produits/${product.id}/edit`}
                          className="text-amber-600 hover:text-amber-900 text-sm font-medium whitespace-nowrap"
                        >
                          <i className="ri-edit-line mr-1"></i>
                          Modifier
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium whitespace-nowrap"
                        >
                          <i className="ri-delete-bin-line mr-1"></i>
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-store-line text-gray-400 text-6xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500 mb-4">Commencez par ajouter votre premier produit.</p>
            <Link
              href="/admin/produits/nouveau"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
            >
              Ajouter un produit
            </Link>
          </div>
        )}

        {/* Modal Mise à jour Prix de l'Or */}
        {showPriceUpdateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Mise à jour du prix de l'or
                  </h3>
                  <button
                    onClick={() => setShowPriceUpdateModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <i className="ri-information-line text-yellow-600 mr-2"></i>
                      <span className="font-medium text-yellow-900">Prix actuel</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">
                      {goldPrices.current} MAD/g
                    </p>
                    <p className="text-sm text-yellow-700">
                      {goldProductsCount} bijoux seront recalculés automatiquement
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nouveau prix de l'or 18K (MAD/gramme)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={newGoldPrice}
                      onChange={(e) => setNewGoldPrice(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Ex: 675.50"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Comment ça marche ?</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Seuls les bijoux avec poids d'or configuré seront recalculés</li>
                      <li>• Nouveau prix = (Prix or × Poids) + Coût main d'œuvre</li>
                      <li>• Les montres ne sont pas affectées</li>
                      <li>• Utilisez "Configurer Prix Auto" pour activer cette fonctionnalité</li>
                    </ul>
                  </div>

                  {goldProductsCount === 0 && (
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center mb-2">
                        <i className="ri-alert-line text-orange-600 mr-2"></i>
                        <span className="font-medium text-orange-900">Attention</span>
                      </div>
                      <p className="text-sm text-orange-700">
                        Aucun bijou n'est configuré pour la mise à jour automatique. Configurez d'abord vos bijoux avec le bouton "Configurer Prix Auto".
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => setShowPriceUpdateModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={updateAllGoldPrices}
                    disabled={updatingPrices || !newGoldPrice}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                  >
                    {updatingPrices ? (
                      <>
                        <i className="ri-loader-4-line mr-2 animate-spin"></i>
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <i className="ri-refresh-line mr-2"></i>
                        Mettre à jour
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal Description et Tags */}
        {showDescriptionModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Description et Tags - {selectedProduct.title}
                  </h3>
                  <button
                    onClick={() => setShowDescriptionModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        src={selectedProduct.images[0]}
                        alt={selectedProduct.title}
                        className={`w-20 h-20 rounded-lg object-cover ${
                          selectedProduct.aiEnhanced ? 'ring-2 ring-blue-500' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedProduct.title}</h4>
                      <p className="text-sm text-gray-500">
                        {getProductCategory(selectedProduct.categoryId).name} • {selectedProduct.priceMAD.toLocaleString()} MAD
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {selectedProduct.aiEnhanced && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <i className="ri-magic-line mr-1"></i>
                            Optimisé par IA
                          </span>
                        )}
                        {selectedProduct.baseGoldPrice && selectedProduct.goldWeight && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <i className="ri-money-dollar-circle-line mr-1"></i>
                            Prix automatique
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800 leading-relaxed">
                        {selectedProduct.description || 'Aucune description disponible'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags ({selectedProduct.tags?.length || 0})
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags && selectedProduct.tags.length > 0 ? (
                        selectedProduct.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-500 text-sm">Aucun tag disponible</p>
                      )}
                    </div>
                  </div>

                  {selectedProduct.baseGoldPrice && selectedProduct.goldWeight && (
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="ri-money-dollar-circle-line text-yellow-600 mr-2"></i>
                        <h5 className="font-medium text-yellow-900">Calcul automatique du prix</h5>
                      </div>
                      <div className="text-sm text-yellow-700 space-y-1">
                        <p>• Poids d'or: {selectedProduct.goldWeight}g</p>
                        <p>• Prix de base: {selectedProduct.baseGoldPrice} MAD/g</p>
                        <p>• Coût main d'œuvre: {selectedProduct.laborCost?.toLocaleString() || 0} MAD</p>
                        <p className="font-medium">• Prix total: {selectedProduct.priceMAD.toLocaleString()} MAD</p>
                      </div>
                    </div>
                  )}

                  {!selectedProduct.aiEnhanced && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <i className="ri-magic-line text-purple-600 mr-2"></i>
                        <h5 className="font-medium text-purple-900">Optimisation IA disponible</h5>
                      </div>
                      <p className="text-sm text-purple-700 mb-3">
                        Améliorez automatiquement la description et générez des tags pertinents avec notre IA.
                      </p>
                      <button
                        onClick={() => {
                          handleAiEnhancement(selectedProduct.id)
                          setShowDescriptionModal(false)
                        }}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                      >
                        <i className="ri-magic-line mr-2"></i>
                        Optimiser avec IA
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setShowDescriptionModal(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
