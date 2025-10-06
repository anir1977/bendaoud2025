
'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Product {
  id: string
  title: string
  slug: string
  brand?: string
  price_mad: number
  images: string[]
  is_published: boolean
  category_slug: string
  created_at: string
  description?: string
  type: string
}

interface Category {
  id: string
  name: string
  type: 'Bijoux' | 'Montres'
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const supabase = createClient()

  const categories: Category[] = [
    { id: 'bagues', name: 'Bagues', type: 'Bijoux' },
    { id: 'bracelets', name: 'Bracelets', type: 'Bijoux' },
    { id: 'gourmettes', name: 'Gourmettes', type: 'Bijoux' },
    { id: 'colliers', name: 'Colliers', type: 'Bijoux' },
    { id: 'parures', name: 'Parures', type: 'Bijoux' },
    { id: 'sautoirs', name: 'Sautoirs', type: 'Bijoux' },
    { id: 'boucles', name: 'Boucles d\'oreilles', type: 'Bijoux' },
    { id: 'montres', name: 'Montres', type: 'Montres' }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('type', 'product')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors du chargement des produits:', error)
        return
      }

      setProducts(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        const { error } = await supabase
          .from('articles')
          .delete()
          .eq('id', id)

        if (error) {
          console.error('Erreur lors de la suppression:', error)
          alert('Erreur lors de la suppression du produit')
          return
        }

        fetchProducts()
        alert('Produit supprimé avec succès!')
      } catch (error) {
        console.error('Erreur lors de la suppression:', error)
        alert('Erreur lors de la suppression du produit')
      }
    }
  }

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ is_published: !currentStatus })
        .eq('id', id)

      if (error) {
        console.error('Erreur lors de la mise à jour:', error)
        alert('Erreur lors de la mise à jour du statut')
        return
      }

      fetchProducts()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
      alert('Erreur lors de la mise à jour du statut')
    }
  }

  const openDescriptionModal = (product: Product) => {
    setSelectedProduct(product)
    setShowDescriptionModal(true)
  }

  const getProductCategory = (categorySlug: string) => {
    return categories.find(c => c.id === categorySlug) || { id: 'unknown', name: 'Non défini', type: 'Bijoux' as const }
  }

  const filteredProducts = products.filter(product => {
    const category = getProductCategory(product.category_slug)
    if (filter === 'all') return true
    if (filter === 'bijoux') return category.type === 'Bijoux'
    if (filter === 'montres') return category.type === 'Montres'
    if (filter === 'active') return product.is_published === true
    if (filter === 'hidden') return product.is_published === false
    return true
  })

  const bijouxCount = products.filter(p => getProductCategory(p.category_slug).type === 'Bijoux').length
  const montresCount = products.filter(p => getProductCategory(p.category_slug).type === 'Montres').length

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
              Publiés ({products.filter(p => p.is_published).length})
            </button>
            <button
              onClick={() => setFilter('hidden')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'hidden' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Masqués ({products.filter(p => !p.is_published).length})
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredProducts.map((product) => {
              const category = getProductCategory(product.category_slug)
              return (
                <li key={product.id}>
                  <div className="px-4 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-16 w-16 relative">
                          <img
                            className="h-16 w-16 rounded-lg object-cover"
                            src={product.images[0]}
                            alt={product.title}
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="text-sm font-medium text-gray-900">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category.name} • {product.price_mad.toLocaleString()} MAD
                            {product.brand && ` • ${product.brand}`}
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              product.is_published 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {product.is_published ? 'Publié' : 'Masqué'}
                            </span>
                          </div>
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
                        <button
                          onClick={() => togglePublishStatus(product.id, product.is_published)}
                          className={`text-sm font-medium whitespace-nowrap ${
                            product.is_published 
                              ? 'text-orange-600 hover:text-orange-900' 
                              : 'text-green-600 hover:text-green-900'
                          }`}
                        >
                          <i className={`mr-1 ${product.is_published ? 'ri-eye-off-line' : 'ri-eye-line'}`}></i>
                          {product.is_published ? 'Masquer' : 'Publier'}
                        </button>
                        <Link
                          href={`/admin/produits/${product.id}/edit`}
                          className="text-amber-600 hover: text-amber-900 text-sm font-medium whitespace-nowrap"
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

        {/* Modal Description */}
        {showDescriptionModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Description - {selectedProduct.title}
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
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedProduct.title}</h4>
                      <p className="text-sm text-gray-500">
                        {getProductCategory(selectedProduct.category_slug).name} • {selectedProduct.price_mad.toLocaleString()} MAD
                      </p>
                      {selectedProduct.brand && (
                        <p className="text-sm text-gray-500">Marque: {selectedProduct.brand}</p>
                      )}
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
