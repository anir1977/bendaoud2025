
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
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'processed'>('all')
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
          title: row.primary_product_title || 'Produit non renseigne',
          priceMAD: Number(row.primary_product_price_mad || 0),
        },
        totalAmountMAD: Number(row.total_amount_mad || row.primary_product_price_mad || 0),
      }))

      setOrders(mapped)
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: number, newStatus: 'PENDING' | 'PROCESSED') => {
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

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    return order.status === filter.toUpperCase()
  })

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
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Demandes d'Achat</h1>
          <p className="mt-2 text-sm text-gray-600">
            Gérez les demandes de vos clients
          </p>
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
              Toutes ({orders.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              En attente ({orders.filter(o => o.status === 'PENDING').length})
            </button>
            <button
              onClick={() => setFilter('processed')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                filter === 'processed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Traitées ({orders.filter(o => o.status === 'PROCESSED').length})
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredOrders.map((order) => (
              <li key={order.id}>
                <div className="px-4 py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {order.customerName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {order.product.title} • {order.product.priceMAD.toLocaleString()} MAD
                          </p>
                          <p className="text-sm text-gray-500">
                            Total: {order.totalAmountMAD.toLocaleString()} MAD
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'PENDING' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {order.status === 'PENDING' ? 'En attente' : 'Traitée'}
                          </span>
                          <span className="text-sm text-gray-500">
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
                  
                  <div className="mt-4 flex items-center space-x-3">
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
