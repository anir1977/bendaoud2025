
'use client'

import { useState, useEffect } from 'react'
import AdminLayout from '@/components/AdminLayout'
import { createClient } from '@/lib/supabase/client'

interface OrderRequest {
  id: number
  customerName: string
  phone: string
  email?: string
  city: string
  address: string
  notes?: string
  status: 'PENDING' | 'PROCESSED' | 'CANCELED'
  createdAt: string
  product: {
    title: string
    priceMAD: number
    image?: string
    size?: string
    quantity: number
  }
  totalAmountMAD: number
}

interface OrderRow {
  id: number
  customer_name: string
  phone: string
  email?: string | null
  city: string
  address: string
  notes?: string | null
  status: 'PENDING' | 'PROCESSED' | 'CANCELED'
  created_at: string
  primary_product_title?: string | null
  primary_product_price_mad?: number | null
  total_amount_mad?: number | null
  items?: Array<{
    id?: string | null
    name?: string | null
    price?: number | null
    quantity?: number | null
    image?: string | null
    category?: string | null
    size?: string | null
  }> | null
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'processed' | 'canceled'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = createClient()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('order_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erreur lors du chargement des demandes:', error)
        setOrders([])
        return
      }

      const mapped = ((data || []) as OrderRow[]).map((row) => ({
        const firstItem = Array.isArray(row.items) && row.items.length > 0 ? row.items[0] : null
        const totalQuantity = Array.isArray(row.items)
          ? row.items.reduce((sum, item) => sum + Number(item?.quantity || 0), 0)
          : 0

        return {
        id: row.id,
        customerName: row.customer_name,
        phone: row.phone,
        email: row.email || undefined,
        city: row.city,
        address: row.address,
        notes: row.notes || undefined,
        status: row.status,
        createdAt: row.created_at,
        product: {
          title: firstItem?.name || row.primary_product_title || 'Produit non renseigne',
          priceMAD: Number(firstItem?.price || row.primary_product_price_mad || 0),
          image: firstItem?.image || undefined,
          size: firstItem?.size || undefined,
          quantity: totalQuantity > 0 ? totalQuantity : 1,
        },
        totalAmountMAD: Number(row.total_amount_mad || row.primary_product_price_mad || 0),
      }})

      setOrders(mapped)
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: 'PENDING' | 'PROCESSED' | 'CANCELED') => {
    try {
      const { error } = await supabase
        .from('order_requests')
        .update({ status: newStatus })
        .eq('id', orderId)

      if (error) {
        throw error
      }

      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const handleDeleteOrder = async (orderId: number) => {
    const confirmed = window.confirm('Supprimer cette commande ? Cette action est irreversible.')
    if (!confirmed) return

    try {
      const { error } = await supabase
        .from('order_requests')
        .delete()
        .eq('id', orderId)

      if (error) {
        throw error
      }

      setOrders(orders.filter((order) => order.id !== orderId))
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Erreur lors de la suppression de la commande.')
    }
  }

  const filteredOrders = orders.filter((order) => {
    const statusMatch =
      filter === 'all' ? true : order.status === filter.toUpperCase()

    const q = searchQuery.trim().toLowerCase()
    const textMatch =
      q.length === 0
        ? true
        : [
            order.customerName,
            order.phone,
            order.email || '',
            order.city,
            order.product.title,
          ]
            .join(' ')
            .toLowerCase()
            .includes(q)

    return statusMatch && textMatch
  })

  const pendingCount = orders.filter((o) => o.status === 'PENDING').length
  const processedCount = orders.filter((o) => o.status === 'PROCESSED').length
  const canceledCount = orders.filter((o) => o.status === 'CANCELED').length
  const todayCount = orders.filter((o) => {
    const d = new Date(o.createdAt)
    const now = new Date()
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    )
  }).length

  if (loading) {
    return (
      <AdminLayout>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="px-4 sm:px-0">
        <div className="mb-8 rounded-2xl border border-gray-200 bg-gradient-to-r from-slate-50 to-amber-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Commandes clients</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">Demandes d'achat</h1>
          <p className="mt-2 text-sm text-gray-600">
            Suivez et traitez les commandes en temps reel avec une vue centralisee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Total</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{orders.length}</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs text-amber-700 uppercase tracking-wide">En attente</p>
            <p className="mt-1 text-2xl font-bold text-amber-700">{pendingCount}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs text-emerald-700 uppercase tracking-wide">Traitées</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{processedCount}</p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50 p-4">
            <p className="text-xs text-sky-700 uppercase tracking-wide">Aujourd'hui</p>
            <p className="mt-1 text-2xl font-bold text-sky-700">{todayCount}</p>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <div className="relative flex-1">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par client, telephone, email, ville, produit..."
                className="w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'all' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Toutes ({orders.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              En attente ({pendingCount})
            </button>
            <button
              onClick={() => setFilter('processed')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'processed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Traitées ({processedCount})
            </button>
            <button
              onClick={() => setFilter('canceled')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'canceled'
                  ? 'bg-gray-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Annulées ({canceledCount})
            </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white shadow rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div className="h-16 w-16 rounded-lg border border-gray-200 bg-gray-50 overflow-hidden flex-shrink-0">
                            {order.product.image ? (
                              <img
                                src={order.product.image}
                                alt={order.product.title}
                                className="h-16 w-16 object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400">
                                <i className="ri-image-line"></i>
                              </div>
                            )}
                          </div>

                          <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.customerName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {order.product.title}
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-xs">
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                              Qte: {order.product.quantity}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-gray-700">
                              Taille: {order.product.size || '-'}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-amber-700 mt-1">
                            Total: {order.totalAmountMAD.toLocaleString()} MAD
                          </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'PENDING' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : order.status === 'PROCESSED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status === 'PENDING'
                              ? 'En attente'
                              : order.status === 'PROCESSED'
                              ? 'Traitée'
                              : 'Annulée'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Contact</h4>
                          <p className="text-sm text-gray-600">
                            <i className="ri-phone-line mr-2"></i>
                            {order.phone}
                          </p>
                          {order.email && (
                            <p className="text-sm text-gray-600 mt-1">
                              <i className="ri-mail-line mr-2"></i>
                              {order.email}
                            </p>
                          )}
                          <p className="text-sm text-gray-600 mt-1">
                            <i className="ri-map-pin-line mr-2"></i>
                            {order.city}
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Adresse</h4>
                          <p className="text-sm text-gray-600">{order.address}</p>
                          {order.notes && (
                            <p className="text-sm text-gray-500 mt-2">
                              <strong>Notes:</strong> {order.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <a
                      href={`https://wa.me/212${order.phone.substring(1)}?text=Bonjour ${order.customerName}, concernant votre demande pour ${order.product.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                    >
                      <i className="ri-whatsapp-line mr-1"></i>
                      WhatsApp
                    </a>
                    
                    <a
                      href={`tel:${order.phone}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                    >
                      <i className="ri-phone-line mr-1"></i>
                      Appeler
                    </a>
                    
                    {order.status === 'PENDING' ? (
                      <button
                        onClick={() => handleStatusChange(order.id, 'PROCESSED')}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                      >
                        <i className="ri-check-line mr-1"></i>
                        Marquer traité
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(order.id, 'PENDING')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                      >
                        <i className="ri-arrow-go-back-line mr-1"></i>
                        Remettre en attente
                      </button>
                    )}

                    {order.status !== 'CANCELED' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'CANCELED')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                      >
                        <i className="ri-close-circle-line mr-1"></i>
                        Annuler
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
                    >
                      <i className="ri-delete-bin-line mr-1"></i>
                      Supprimer
                    </button>
                  </div>
              </div>
            ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-mail-line text-gray-400 text-6xl mb-4"></i>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande trouvée</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'Aucune demande d\'achat pour le moment.' 
                : `Aucune demande ${filter === 'pending' ? 'en attente' : 'traitée'}.`
              }
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
