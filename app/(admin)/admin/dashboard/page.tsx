
'use client'

import { useEffect, useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

interface Stats {
  totalProducts: number
  activeProducts: number
  bijouxCount: number
  montresCount: number
  pendingOrders: number
  recentOrders: any[]
  analytics: {
    totalVisits: number
    todayVisits: number
    weeklyVisits: number
    monthlyVisits: number
    topPages: { page: string; visits: number }[]
    deviceStats: { desktop: number; mobile: number; tablet: number }
    ordersByDay: { date: string; orders: number }[]
    popularProducts: { name: string; views: number }[]
  }
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      // Mock analytics data
      const mockStats: Stats = {
        totalProducts: 45,
        activeProducts: 42,
        bijouxCount: 28,
        montresCount: 17,
        pendingOrders: 8,
        recentOrders: [
          {
            id: '1',
            customerName: 'Fatima El Amrani',
            product: { title: 'Bague Solitaire Diamant Or 18K' },
            status: 'PENDING',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            customerName: 'Ahmed Benali',
            product: { title: 'Montre Tissot PRC 200' },
            status: 'PENDING',
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ],
        analytics: {
          totalVisits: 12847,
          todayVisits: 156,
          weeklyVisits: 1243,
          monthlyVisits: 4567,
          topPages: [
            { page: 'Accueil', visits: 3245 },
            { page: 'Bijoux', visits: 2156 },
            { page: 'Montres', visits: 1876 },
            { page: 'Contact', visits: 987 },
            { page: 'À propos', visits: 654 }
          ],
          deviceStats: {
            desktop: 45,
            mobile: 48,
            tablet: 7
          },
          ordersByDay: [
            { date: 'Lun', orders: 12 },
            { date: 'Mar', orders: 8 },
            { date: 'Mer', orders: 15 },
            { date: 'Jeu', orders: 10 },
            { date: 'Ven', orders: 18 },
            { date: 'Sam', orders: 22 },
            { date: 'Dim', orders: 14 }
          ],
          popularProducts: [
            { name: 'Bague Solitaire Diamant', views: 456 },
            { name: 'Montre Tissot PRC 200', views: 389 },
            { name: 'Collier Perles Or', views: 312 },
            { name: 'Bracelet Tennis', views: 287 },
            { name: 'Montre Guess Collection', views: 234 }
          ]
        }
      }
      setStats(mockStats)
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error)
    } finally {
      setLoading(false)
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

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tableau de bord</h1>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
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
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
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
                      Visites Aujourd'hui
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.analytics.todayVisits || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
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
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
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
                      Visites Totales
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats?.analytics.totalVisits.toLocaleString() || 0}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Analytics des visites */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-line-chart-line mr-2 text-blue-500"></i>
                Analytics des Visites
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aujourd'hui</span>
                  <span className="font-semibold text-gray-900">{stats?.analytics.todayVisits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cette semaine</span>
                  <span className="font-semibold text-gray-900">{stats?.analytics.weeklyVisits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ce mois</span>
                  <span className="font-semibold text-gray-900">{stats?.analytics.monthlyVisits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-sm font-medium text-gray-700">Total</span>
                  <span className="font-bold text-lg text-amber-600">{stats?.analytics.totalVisits.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pages populaires */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-fire-line mr-2 text-red-500"></i>
                Pages Populaires
              </h3>
              <div className="space-y-3">
                {stats?.analytics.topPages.map((page, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full mr-2">
                        {index + 1}
                      </span>
                      <span className="text-sm text-gray-700">{page.page}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{page.visits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Appareils utilisés */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-device-line mr-2 text-green-500"></i>
                Appareils Utilisés
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="ri-computer-line text-blue-500 mr-2"></i>
                    <span className="text-sm text-gray-700">Desktop</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${stats?.analytics.deviceStats.desktop}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{stats?.analytics.deviceStats.desktop}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="ri-smartphone-line text-green-500 mr-2"></i>
                    <span className="text-sm text-gray-700">Mobile</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: `${stats?.analytics.deviceStats.mobile}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{stats?.analytics.deviceStats.mobile}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <i className="ri-tablet-line text-purple-500 mr-2"></i>
                    <span className="text-sm text-gray-700">Tablette</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: `${stats?.analytics.deviceStats.tablet}%`}}></div>
                    </div>
                    <span className="text-sm font-medium">{stats?.analytics.deviceStats.tablet}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Graphique des demandes par jour */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-bar-chart-2-line mr-2 text-amber-500"></i>
                Demandes par Jour (7 derniers jours)
              </h3>
              <div className="space-y-3">
                {stats?.analytics.ordersByDay.map((day, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-sm text-gray-600 w-12">{day.date}</span>
                    <div className="flex-1 mx-3">
                      <div className="bg-gray-200 rounded-full h-4 relative">
                        <div 
                          className="bg-amber-500 h-4 rounded-full flex items-center justify-end pr-2"
                          style={{width: `${(day.orders / 25) * 100}%`}}
                        >
                          <span className="text-xs text-white font-medium">{day.orders}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Produits populaires */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                <i className="ri-star-line mr-2 text-yellow-500"></i>
                Produits les Plus Vus
              </h3>
              <div className="space-y-4">
                {stats?.analytics.popularProducts.map((product, index) => (
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
                      <span className="text-sm text-gray-700">{product.name}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-eye-line text-gray-400 mr-1"></i>
                      <span className="text-sm font-medium text-gray-900">{product.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section demandes récentes (existante) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Demandes Récentes
              </h3>
              {stats?.recentOrders && stats.recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentOrders.slice(0, 5).map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium text-gray-900">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.product?.title}</p>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'PENDING' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {order.status === 'PENDING' ? 'En attente' : 'Traité'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Aucune demande récente</p>
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
