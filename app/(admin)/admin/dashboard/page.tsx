
'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { createClient } from '@/lib/supabase/client'
import staticProductsData from '@/lib/products-data.json'

interface ProductRow {
  id: string
  title: string
  category_slug: string
  is_published: boolean
  created_at: string
}

interface RecentProduct {
  id: string
  title: string
  status: 'PUBLISHED' | 'HIDDEN'
  createdAt: string
}

interface DailyProducts {
  date: string
  products: number
}

interface CategoryStat {
  key: string
  label: string
  count: number
}

interface RecentOrder {
  id: number
  customerName: string
  productTitle: string
  status: 'PENDING' | 'PROCESSED' | 'CANCELED'
  createdAt: string
}

interface Stats {
  totalProducts: number
  activeProducts: number
  hiddenProducts: number
  bijouxCount: number
  montresCount: number
  newProducts30d: number
  pendingOrders: number
  recentProducts: RecentProduct[]
  recentOrders: RecentOrder[]
  productsByDay: DailyProducts[]
  topCategories: CategoryStat[]
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [maintenanceEnabled, setMaintenanceEnabled] = useState(false)
  const [maintenanceLoading, setMaintenanceLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [
        { data: productsData, error: productsError },
        { data: pendingRows, error: pendingError },
        { data: ordersData, error: ordersError },
      ] = await Promise.all([
        supabase
          .from('articles')
          .select('id, title, category_slug, is_published, created_at')
          .order('created_at', { ascending: false }),
        supabase
          .from('order_requests')
          .select('id')
          .eq('status', 'PENDING'),
        supabase
          .from('order_requests')
          .select('id, customer_name, primary_product_title, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
      ])

      if (productsError) {
        console.error('Erreur chargement produits dashboard:', productsError)
      }
      if (pendingError) {
        console.error('Erreur chargement demandes en attente:', pendingError)
      }
      if (ordersError) {
        console.error('Erreur chargement demandes recentes:', ordersError)
      }

      const products = (productsData && productsData.length > 0
        ? (productsData as ProductRow[])
        : (staticProductsData as any[])
            .filter((p) => p.type === 'product')
            .map((p) => ({
              id: String(p.id || p.slug),
              title: p.title,
              category_slug: p.category_slug || 'unknown',
              is_published: Boolean(p.is_published),
              created_at: '',
            }))) as ProductRow[]
      const now = new Date()
      const thirtyDaysAgo = new Date(now)
      thirtyDaysAgo.setDate(now.getDate() - 30)

      const totalProducts = products.length
      const activeProducts = products.filter((p) => p.is_published).length
      const hiddenProducts = totalProducts - activeProducts
      const bijouxCount = products.filter((p) => p.category_slug !== 'montres').length
      const montresCount = products.filter((p) => p.category_slug === 'montres').length
      const newProducts30d = products.filter((p) => {
        if (!p.created_at) return false
        const d = new Date(p.created_at)
        return !Number.isNaN(d.getTime()) && d >= thirtyDaysAgo
      }).length

      const recentProducts: RecentProduct[] = products.slice(0, 5).map((product) => ({
        id: product.id,
        title: product.title,
        status: product.is_published ? 'PUBLISHED' : 'HIDDEN',
        createdAt: product.created_at,
      }))

      const categoryMap = new Map<string, number>()
      for (const product of products) {
        const key = product.category_slug || 'non-defini'
        categoryMap.set(key, (categoryMap.get(key) || 0) + 1)
      }
      const topCategories: CategoryStat[] = Array.from(categoryMap.entries())
        .map(([key, count]) => ({
          key,
          label: key === 'montres' ? 'Montres' : key.charAt(0).toUpperCase() + key.slice(1),
          count,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
      const productsByDay: DailyProducts[] = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(now)
        date.setDate(now.getDate() - (6 - index))
        const key = date.toISOString().slice(0, 10)
        const count = products.filter((product) => product.created_at && product.created_at.slice(0, 10) === key).length

        return {
          date: weekDays[date.getDay()],
          products: count,
        }
      })

      let pendingOrders = (pendingRows || []).length
      let recentOrders: RecentOrder[] = []

      if (!ordersError) {
        recentOrders = (ordersData || []).map((order: any) => ({
          id: order.id,
          customerName: order.customer_name,
          productTitle: order.primary_product_title || 'Produit non renseigne',
          status: order.status,
          createdAt: order.created_at,
        }))
      }

      setStats({
        totalProducts,
        activeProducts,
        hiddenProducts,
        bijouxCount,
        montresCount,
        newProducts30d,
        pendingOrders,
        recentProducts,
        recentOrders,
        productsByDay,
        topCategories,
      })

      const maintenanceResponse = await fetch('/api/admin/maintenance', {
        cache: 'no-store',
      })
      if (maintenanceResponse.ok) {
        const maintenanceJson = await maintenanceResponse.json()
        setMaintenanceEnabled(Boolean(maintenanceJson?.enabled))
      }
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleMaintenance = async () => {
    setMaintenanceLoading(true)
    try {
      const response = await fetch('/api/admin/maintenance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: !maintenanceEnabled }),
      })

      if (!response.ok) {
        throw new Error('Impossible de changer le mode maintenance')
      }

      const json = await response.json()
      setMaintenanceEnabled(Boolean(json?.enabled))
    } catch (error) {
      console.error(error)
      alert('Erreur lors du changement du mode maintenance.')
    } finally {
      setMaintenanceLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow h-32"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  const publicationRate = stats?.totalProducts
    ? Math.round((stats.activeProducts / stats.totalProducts) * 100)
    : 0
  const hiddenRate = stats?.totalProducts ? 100 - publicationRate : 0
  const recentOrdersCount = stats?.recentOrders?.length || 0

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="mb-8 rounded-2xl border border-gray-200 bg-gradient-to-r from-slate-50 to-amber-50 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Admin center</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="mt-2 text-sm text-gray-600">
                Vue globale du catalogue, des commandes et des priorites du jour.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-white/80 border border-gray-200 px-3 py-1 text-xs text-gray-700">
                <i className="ri-time-line mr-1"></i>
                Derniere sync: {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <button
                onClick={toggleMaintenance}
                disabled={maintenanceLoading}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white whitespace-nowrap ${
                  maintenanceEnabled
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                } disabled:opacity-60`}
              >
                <i className="ri-tools-line mr-2"></i>
                {maintenanceLoading
                  ? 'Mise a jour...'
                  : maintenanceEnabled
                  ? 'Desactiver maintenance'
                  : 'Activer maintenance'}
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-blue-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                    <i className="ri-store-line text-white"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Produits
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.totalProducts || 0}
                    </dd>
                    <dd className="text-xs text-gray-500 mt-1">
                      {stats?.bijouxCount || 0} bijoux / {stats?.montresCount || 0} montres
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-green-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <i className="ri-eye-line text-white"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Produits Publies
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.activeProducts || 0}
                    </dd>
                    <dd className="text-xs text-gray-500 mt-1">
                      Taux publication: {publicationRate}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-amber-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center">
                    <i className="ri-shopping-cart-line text-white"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Demandes en Attente
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.pendingOrders || 0}
                    </dd>
                    <dd className="text-xs text-gray-500 mt-1">
                      {recentOrdersCount} demandes recentes
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-purple-500">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                    <i className="ri-bar-chart-line text-white"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Nouveaux (30j)
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.newProducts30d || 0}
                    </dd>
                    <dd className="text-xs text-gray-500 mt-1">
                      Masques: {hiddenRate}%
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Resume catalogue */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-line-chart-line mr-2 text-blue-500"></i>
                Resume du Catalogue
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bijoux</span>
                  <span className="font-semibold text-gray-900">{stats?.bijouxCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Montres</span>
                  <span className="font-semibold text-gray-900">{stats?.montresCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Taux de publication</span>
                  <span className="font-semibold text-gray-900">{publicationRate}%</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-sm font-medium text-gray-700">Catalogue total</span>
                  <span className="font-bold text-lg text-amber-600">{stats?.totalProducts}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Categories dominantes */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-fire-line mr-2 text-red-500"></i>
                Categories Dominantes
              </h3>
              <div className="space-y-3">
                {stats?.topCategories.map((category, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-700">{category.label}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{category.count}</span>
                  </div>
                ))}
                {stats?.topCategories.length === 0 && (
                  <p className="text-sm text-gray-500">Aucune categorie disponible.</p>
                )}
              </div>
            </div>
          </div>

          {/* Derniers produits */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-device-line mr-2 text-green-500"></i>
                Derniers Produits Ajoutes
              </h3>
              <div className="space-y-4">
                {stats?.recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'PUBLISHED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {product.status === 'PUBLISHED' ? 'Publie' : 'Masque'}
                    </span>
                  </div>
                ))}
                {stats?.recentProducts.length === 0 && (
                  <p className="text-sm text-gray-500">Aucun produit ajoute recemment.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique des ajouts par jour */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-bar-chart-2-line mr-2 text-amber-500"></i>
                Produits Ajoutes par Jour (7 derniers jours)
              </h3>
              <div className="space-y-3">
                {stats?.productsByDay.map((day, index) => {
                  const maxValue = Math.max(...(stats?.productsByDay || []).map((item) => item.products), 1)
                  const width = maxValue > 0 ? (day.products / maxValue) * 100 : 0

                  return (
                  <div key={index} className="flex items-center">
                    <span className="text-sm text-gray-600 w-12">{day.date}</span>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-amber-500 h-4 rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${width}%` }}
                        >
                          <span className="text-xs text-white font-medium">{day.products}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          </div>

          {/* Produits publies recemment */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-star-line mr-2 text-yellow-500"></i>
                Produits Publies Recentement
              </h3>
              <div className="space-y-4">
                {(stats?.recentProducts || [])
                  .filter((product) => product.status === 'PUBLISHED')
                  .slice(0, 5)
                  .map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className={`text-xs px-2 py-1 rounded-full mr-3 ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' :
                        index === 1 ? 'bg-gray-100 text-gray-800' :
                        index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        #{index + 1}
                      </span>
                      <span className="text-sm text-gray-700">{product.title}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-calendar-line text-gray-400 mr-1"></i>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(product.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  </div>
                ))}
                {(stats?.recentProducts || []).filter((product) => product.status === 'PUBLISHED').length === 0 && (
                  <p className="text-sm text-gray-500">Aucun produit publie recemment.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Section produits recents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Demandes Recentes
              </h3>
              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentOrders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.productTitle}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'PROCESSED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status === 'PENDING'
                          ? 'En attente'
                          : order.status === 'PROCESSED'
                          ? 'Traitee'
                          : 'Annulee'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucune demande recente</p>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Actions Rapides
              </h3>
              <div className="space-y-3">
                <a
                  href="/admin/produits/nouveau"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  Ajouter un produit
                </a>
                <a
                  href="/admin/demandes"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center whitespace-nowrap"
                >
                  <i className="ri-mail-line mr-2"></i>
                  Voir les demandes
                </a>
                <a
                  href="/admin/categories"
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center whitespace-nowrap"
                >
                  <i className="ri-folder-line mr-2"></i>
                  Gérer les catégories
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
