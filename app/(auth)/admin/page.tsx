'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@supabase/auth-helpers-nextjs'

interface AdminUser {
  id: string
  email: string
  name: string
  is_active: boolean
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Vérifier la session Supabase
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        console.error('Erreur session:', sessionError)
        router.push('/admin/login')
        return
      }

      if (!session?.user) {
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
        setError('Accès non autorisé. Vous n\'êtes pas administrateur.')
        setTimeout(() => {
          supabase.auth.signOut()
          router.push('/admin/login')
        }, 3000)
        return
      }

      setAdminUser(adminData)
      // Rediriger vers le dashboard admin
      router.push('/admin/dashboard')
      
    } catch (err) {
      console.error('Erreur lors de la vérification:', err)
      setError('Erreur lors de la vérification de l\'authentification')
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <i className="ri-error-warning-line text-2xl"></i>
            </div>
            <p className="font-medium mb-2">Accès refusé</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={handleSignOut}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm whitespace-nowrap"
            >
              Retour à la connexion
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="bg-green-50 border border-green-200 text-green-600 px-6 py-4 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <i className="ri-check-line text-2xl"></i>
          </div>
          <p className="font-medium">Authentification réussie</p>
          <p className="text-sm mt-1">Redirection vers le tableau de bord...</p>
        </div>
      </div>
    </div>
  )
}