'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface AdminUser {
  id: string
  email: string
  name: string
  is_active: boolean
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Vérifier la session Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session?.user) {
        router.push('/admin/login')
        return
      }

      setUser(session.user)

      // Vérifier si l'utilisateur est dans admin_users
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', session.user.email)
        .eq('is_active', true)
        .single()

      if (adminError || !adminData) {
        await supabase.auth.signOut()
        router.push('/admin/login')
        return
      }

      setAdminUser(adminData)
    } catch (error) {
      console.error('Erreur lors de la vérification:', error)
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user || !adminUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            <p className="font-medium">Accès non autorisé</p>
            <p className="text-sm mt-1">Redirection vers la page de connexion...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/admin/dashboard" className="text-xl font-['Pacifico'] text-amber-600">
                Ben Daoud Admin
              </Link>
              <div className="ml-10 flex space-x-8">
                <Link
                  href="/admin/dashboard"
                  className="text-gray-900 hover:text-amber-600 px-3 py-2 text-sm font-medium"
                >
                  Tableau de bord
                </Link>
                <Link
                  href="/admin/produits"
                  className="text-gray-900 hover:text-amber-600 px-3 py-2 text-sm font-medium"
                >
                  Produits
                </Link>
                <Link
                  href="/admin/demandes"
                  className="text-gray-900 hover:text-amber-600 px-3 py-2 text-sm font-medium"
                >
                  Demandes
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm"
              >
                Voir le site
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-amber-600"></i>
                </div>
                <span className="text-sm text-gray-700">
                  {adminUser.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
              >
                <i className="ri-logout-box-line mr-2"></i>
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}