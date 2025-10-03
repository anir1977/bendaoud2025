
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
}

interface AdminSession {
  user: {
    id: string
    email: string
    name: string
    role: string
  }
  expires: number
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter()
  const [session, setSession] = useState<AdminSession | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const sessionData = localStorage.getItem('admin_session')
      if (sessionData) {
        const parsedSession: AdminSession = JSON.parse(sessionData)
        
        // Vérifier si la session n'a pas expiré
        if (parsedSession.expires > Date.now()) {
          setSession(parsedSession)
        } else {
          localStorage.removeItem('admin_session')
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    } catch (error) {
      localStorage.removeItem('admin_session')
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/login')
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

  if (!session) {
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
              <span className="text-sm text-gray-700">
                {session.user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
              >
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
