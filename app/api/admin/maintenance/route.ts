import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SETTING_KEY = 'maintenance_mode'
const EMERGENCY_ADMIN_EMAIL = 'ayouz202@gmail.com'
const EMERGENCY_SESSION_MAX_MS = 12 * 60 * 60 * 1000

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', SETTING_KEY)
      .maybeSingle()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ enabled: Boolean(data?.value) })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const body = await request.json().catch(() => ({}))
    const enabled = Boolean(body?.enabled)

    const { data: userData, error: userError } = await supabase.auth.getUser()
    let actorEmail = userData.user?.email || null

    if (!userError && userData.user?.email) {
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('id')
        .eq('email', userData.user.email)
        .eq('is_active', true)
        .maybeSingle()

      if (adminError || !adminData) {
        return NextResponse.json({ error: 'Acces admin requis' }, { status: 403 })
      }
    } else {
      // Fallback temporaire pour la session admin de secours (sans session Supabase)
      const emergencyEmail = String(body?.emergencySession?.email || '').trim().toLowerCase()
      const emergencyExpiresAt = Number(body?.emergencySession?.expiresAt || 0)
      const now = Date.now()
      const isEmergencyValid =
        emergencyEmail === EMERGENCY_ADMIN_EMAIL &&
        Number.isFinite(emergencyExpiresAt) &&
        emergencyExpiresAt > now &&
        emergencyExpiresAt <= now + EMERGENCY_SESSION_MAX_MS

      if (!isEmergencyValid) {
        return NextResponse.json({ error: 'Session admin invalide. Reconnectez-vous.' }, { status: 401 })
      }

      actorEmail = EMERGENCY_ADMIN_EMAIL
    }

    const { error: upsertError } = await supabase
      .from('site_settings')
      .upsert(
        {
          key: SETTING_KEY,
          value: enabled,
          updated_at: new Date().toISOString(),
          updated_by: actorEmail,
        },
        { onConflict: 'key' }
      )

    if (upsertError) {
      return NextResponse.json({ error: upsertError.message }, { status: 500 })
    }

    return NextResponse.json({ enabled })
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
