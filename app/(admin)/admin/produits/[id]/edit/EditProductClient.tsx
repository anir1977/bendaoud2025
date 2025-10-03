
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
  tags?: string[]
  aiEnhanced?: boolean
  size?: string
}

interface EditProductClientProps {
  productId: string
}

export default function EditProductClient({ productId }: EditProductClientProps) {
  const router = useRouter()
  
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [product, setProduct] = useState<Product | null>(null)
  const [aiGenerating, setAiGenerating] = useState(false)
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
    images: [''],
    tags: [] as string[],
    aiEnhanced: false,
    size: ''
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
    loadProduct()
  }, [productId])

  const loadProduct = () => {
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      const foundProduct = products.find((p: Product) => p.id === productId)
      
      if (foundProduct) {
        setProduct(foundProduct)
        setFormData({
          title: foundProduct.title,
          slug: foundProduct.slug,
          brand: foundProduct.brand || '',
          description: foundProduct.description,
          priceMAD: foundProduct.priceMAD.toString(),
          categoryId: foundProduct.categoryId,
          metalColor: foundProduct.metalColor || '',
          carat: '18K',
          status: foundProduct.status,
          images: foundProduct.images.length > 0 ? foundProduct.images : [''],
          tags: foundProduct.tags || [],
          aiEnhanced: foundProduct.aiEnhanced || false,
          size: foundProduct.size || ''
        })
      } else {
        alert('Produit non trouvé')
        router.push('/admin/produits')
      }
    } catch (error) {
      console.error('Erreur lors du chargement du produit:', error)
      alert('Erreur lors du chargement du produit')
      router.push('/admin/produits')
    } finally {
      setLoadingProduct(false)
    }
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
  }

  const generateAiDescription = async () => {
    setAiGenerating(true)
    
    // Simulation de génération IA
    setTimeout(() => {
      const category = categories.find(c => c.id === formData.categoryId)
      let aiDescription = ''
      
      if (category?.type === 'Bijoux') {
        const descriptions = [
          `${formData.title} - Une pièce d'exception qui allie tradition artisanale et design contemporain. Chaque détail a été soigneusement pensé pour créer un bijou unique qui sublimera votre style avec élégance et raffinement. Fabriqué en or 18 carats de qualité supérieure, ce bijou incarne l'excellence de la joaillerie française.`,
          `Découvrez ${formData.title}, un bijou d'une beauté intemporelle qui capture la lumière et les regards. Fabriqué avec les plus beaux matériaux et un savoir-faire exceptionnel, ce bijou est le symbole parfait de l'élégance et du luxe. Chaque pièce est unique et reflète l'art de la joaillerie dans sa forme la plus pure.`,
          `${formData.title} incarne l'art de la joaillerie dans sa forme la plus pure. Cette création exceptionnelle vous accompagnera dans vos moments les plus précieux, ajoutant une touche de luxe et d'élégance à votre quotidien. Un bijou intemporel qui traverse les générations avec grâce et distinction.`
        ]
        aiDescription = descriptions[Math.floor(Math.random() * descriptions.length)]
      } else {
        const descriptions = [
          `${formData.title} - L'alliance parfaite entre précision horlogère et design sophistiqué. Cette montre de prestige vous accompagne au quotidien avec fiabilité et élégance, reflétant votre goût pour l'excellence. Un garde-temps exceptionnel qui allie tradition et innovation.`,
          `Découvrez ${formData.title}, une montre qui transcende le temps par son design intemporel et sa précision remarquable. Chaque composant a été sélectionné pour offrir une expérience horlogère d'exception. Un accessoire indispensable pour les amateurs de belle horlogerie.`,
          `${formData.title} représente l'excellence de l'horlogerie moderne. Cette pièce unique combine innovation technique et esthétique raffinée pour créer un accessoire indispensable à votre style. Une montre qui vous accompagnera fidèlement dans tous vos moments importants.`
        ]
        aiDescription = descriptions[Math.floor(Math.random() * descriptions.length)]
      }
      
      setFormData(prev => ({
        ...prev,
        description: aiDescription,
        aiEnhanced: true
      }))
      setAiGenerating(false)
    }, 2000)
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

  const updateProduct = (updatedProduct: Product) => {
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]')
      const updatedProducts = products.map((p: Product) => 
        p.id === productId ? updatedProduct : p
      )
      localStorage.setItem('products', JSON.stringify(updatedProducts))
      return true
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
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

      const updatedProduct: Product = {
        ...product!,
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
        tags: formData.tags,
        aiEnhanced: formData.aiEnhanced,
        size: formData.size
      }

      const success = updateProduct(updatedProduct)
      
      if (success) {
        alert('Produit modifié avec succès!')
        router.push('/admin/produits')
      } else {
        alert('Erreur lors de la modification du produit')
      }
    } catch (error) {
      console.error('Erreur lors de la modification:', error)
      alert('Erreur lors de la modification du produit')
    } finally {
      setLoading(false)
    }
  }

  const selectedCategory = categories.find(c => c.id === formData.categoryId)
  const isBijoux = selectedCategory?.type === 'Bijoux'
  const showSizeField = selectedCategory?.name === 'Bagues' || selectedCategory?.name === 'Bracelets'

  if (loadingProduct) {
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

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg inline-block">
            <p className="font-medium">Produit non trouvé</p>
            <p className="text-sm mt-1">Le produit que vous cherchez n'existe pas.</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Modifier le Produit</h1>
          <p className="mt-2 text-sm text-gray-600">
            Modifiez les informations de votre produit
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
                    <input
                      type="text"
                      value="18K"
                      readOnly
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>
              )}

              {showSizeField && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Taille {selectedCategory?.name === 'Bagues' ? '(Tour de doigt)' : '(Tour de poignet)'}
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 pr-8"
                  >
                    <option value="">Taille unique / Non spécifiée</option>
                    {selectedCategory?.name === 'Bagues' ? (
                      <>
                        <option value="48">48 (Taille 8)</option>
                        <option value="49">49 (Taille 9)</option>
                        <option value="50">50 (Taille 10)</option>
                        <option value="51">51 (Taille 11)</option>
                        <option value="52">52 (Taille 12)</option>
                        <option value="53">53 (Taille 13)</option>
                        <option value="54">54 (Taille 14)</option>
                        <option value="55">55 (Taille 15)</option>
                        <option value="56">56 (Taille 16)</option>
                        <option value="57">57 (Taille 17)</option>
                        <option value="58">58 (Taille 18)</option>
                        <option value="59">59 (Taille 19)</option>
                        <option value="60">60 (Taille 20)</option>
                      </>
                    ) : (
                      <>
                        <option value="16cm">16 cm</option>
                        <option value="17cm">17 cm</option>
                        <option value="18cm">18 cm</option>
                        <option value="19cm">19 cm</option>
                        <option value="20cm">20 cm</option>
                        <option value="21cm">21 cm</option>
                        <option value="22cm">22 cm</option>
                        <option value="Ajustable">Ajustable</option>
                      </>
                    )}
                  </select>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <button
                    type="button"
                    onClick={generateAiDescription}
                    disabled={aiGenerating}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                  >
                    {aiGenerating ? (
                      <>
                        <i className="ri-loader-4-line mr-1 animate-spin"></i>
                        Génération...
                      </>
                    ) : (
                      <>
                        <i className="ri-magic-line mr-1"></i>
                        Générer avec IA
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Description détaillée du produit..."
                />
                {formData.aiEnhanced && (
                  <p className="mt-1 text-xs text-purple-600">
                    <i className="ri-magic-line mr-1"></i>
                    Description générée par IA
                  </p>
                )}
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

              {formData.aiEnhanced && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <i className="ri-magic-line text-blue-600 mr-2"></i>
                    <span className="font-medium text-blue-900">Produit optimisé par IA</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Ce produit a été amélioré automatiquement avec des descriptions et tags générés par IA.
                  </p>
                </div>
              )}
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
              {loading ? 'Modification...' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
