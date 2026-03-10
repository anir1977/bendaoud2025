import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

const SETTING_KEY = 'maintenance_mode'

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

    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData.user?.email) {
      return NextResponse.json({ error: 'Non autorise' }, { status: 401 })
    }

    const { data: adminData, error: adminError } = await supabase
      .from('admin_users')
      .select('id')
      .eq('email', userData.user.email)
      .eq('is_active', true)
      .maybeSingle()

    if (adminError || !adminData) {
      return NextResponse.json({ error: 'Acces admin requis' }, { status: 403 })
    }

    const body = await request.json().catch(() => ({}))
    const enabled = Boolean(body?.enabled)

    const { error: upsertError } = await supabase
      .from('site_settings')
      .upsert(
        {
          key: SETTING_KEY,
          value: enabled,
          updated_at: new Date().toISOString(),
          updated_by: userData.user.email,
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
