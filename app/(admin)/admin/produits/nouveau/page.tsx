
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/AdminLayout'
import { generateSlug } from '@/lib/utils'

interface Category {
  id: string
  name: string
  type: 'Bijoux' | 'Montres'
}

interface Product {
  id: string
  title: string
  slug: string
  brand?: string
  description: string
  priceMAD: number
  categoryId: string
  metalColor?: string
  carat?: string
  status: 'ACTIVE' | 'HIDDEN'
  images: string[]
  createdAt: string
}

export default function NewProduct() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    brand: '',
    description: '',
    priceMAD: '',
    categoryId: '',
    metalColor: '',
    carat: '18K',
    status: 'ACTIVE' as 'ACTIVE' | 'HIDDEN',
    images: ['']
  })

  useEffect(() => {
    const mockCategories: Category[] = [
      { id: '1', name: 'Bagues', type: 'Bijoux' },
      { id: '2', name: 'Solitaires', type: 'Bijoux' },
      { id: '3', name: 'Bracelets', type: 'Bijoux' },
      { id: '4', name: 'Colliers', type: 'Bijoux' },
      { id: '5', name: 'Tissot', type: 'Montres' },
      { id: '6', name: 'Guess', type: 'Montres' },
      { id: '7', name: 'Festina', type: 'Montres' }
    ]
    setCategories(mockCategories)
  }, [])

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      const newImages = [...formData.images]
      newImages[index] = result
      setFormData(prev => ({ ...prev, images: newImages }))
    }
    reader.readAsDataURL(file)
  }

  const addImageField = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }))
  }

  const removeImageField = (index: number) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index)
      setFormData(prev => ({ ...prev, images: newImages }))
    }
  }

  const saveProduct = (product: Product) => {
    try {
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]')
      const updatedProducts = [...existingProducts, product]
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      return true
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!formData.title || !formData.description || !formData.priceMAD || !formData.categoryId) {
        alert('Veuillez remplir tous les champs obligatoires')
        setLoading(false)
        return
      }

      if (!formData.images[0]) {
        alert('Veuillez ajouter au moins une photo')
        setLoading(false)
        return
      }

      const newProduct: Product = {
        id: Date.now().toString(),
        title: formData.title,
        slug: formData.slug,
        brand: formData.brand,
        description: formData.description,
        priceMAD: parseFloat(formData.priceMAD),
        categoryId: formData.categoryId,
        metalColor: formData.metalColor,
        carat: formData.carat,
        status: formData.status,
        images: formData.images.filter(img => img.trim() !== ''),
        createdAt: new Date().toISOString()
      }

      const success = saveProduct(newProduct)
      
      if (success) {
        alert('Produit ajouté avec succès!')
        router.push('/admin/produits')
      } else {
        alert('Erreur lors de la sauvegarde du produit')
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      alert('Erreur lors de la sauvegarde du produit')
    } finally {
      setLoading(false)
    }
  }

  const selectedCategory = categories.find(c => c.id === formData.categoryId)
  const isBijoux = selectedCategory?.type === 'Bijoux'

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Nouveau Produit</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ajoutez un nouveau produit à votre catalogue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre du produit *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Ex: Bague Solitaire Diamant Or 18K"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Slug URL
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                  placeholder="bague-solitaire-diamant-or-18k"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Catégorie *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 pr-8"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    <optgroup label="Bijoux">
                      {categories.filter(c => c.type === 'Bijoux').map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Montres">
                      {categories.filter(c => c.type === 'Montres').map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prix (MAD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.priceMAD}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceMAD: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    placeholder="2500.00"
                  />
                </div>
              </div>

              {!isBijoux && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Marque
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Ex: Tissot, Guess, Festina"
                  />
                </div>
              )}

              {isBijoux && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Couleur d'or
                    </label>
                    <select
                      value={formData.metalColor}
                      onChange={(e) => setFormData(prev => ({ ...prev, metalColor: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 pr-8"
                    >
                      <option value="">Sélectionner</option>
                      <option value="Or jaune">Or jaune</option>
                      <option value="Or blanc">Or blanc</option>
                      <option value="Or rose">Or rose</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Carat
                    </label>
                    <select
                      value={formData.carat}
                      onChange={(e) => setFormData(prev => ({ ...prev, carat: e.target.value }))}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 pr-8"
                    >
                      <option value="18K">18K</option>
                      <option value="14K">14K</option>
                      <option value="22K">22K</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Description détaillée du produit..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photos du produit *
                </label>
                {formData.images.map((image, index) => (
                  <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Photo {index + 1}
                      </span>
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(index, file)
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        required={index === 0 && !image}
                      />
                      
                      {image && (
                        <div className="mt-2">
                          <img
                            src={image}
                            alt={`Aperçu ${index + 1}`}
                            className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                <button
                  type="button"
                  onClick={addImageField}
                  className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                >
                  <i className="ri-add-line mr-1"></i>
                  Ajouter une photo
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Statut
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'ACTIVE' | 'HIDDEN' }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 pr-8"
                >
                  <option value="ACTIVE">Actif</option>
                  <option value="HIDDEN">Masqué</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
