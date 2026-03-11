import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const SETTING_KEY = 'maintenance_mode'
const CACHE_MS = 30_000
const FORCE_MAINTENANCE = false

let cachedMaintenance = {
  value: false,
  expiresAt: 0,
}

function isBypassedPath(pathname: string) {
  if (pathname === '/maintenance') return true
  if (pathname.startsWith('/admin')) return true
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/api/admin')) return true
  if (pathname === '/favicon.ico') return true
  if (pathname === '/robots.txt') return true
  if (pathname === '/sitemap.xml') return true

  // Let static assets pass through.
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

async function getMaintenanceMode() {
  const now = Date.now()
  if (cachedMaintenance.expiresAt > now) {
    return cachedMaintenance.value
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    return false
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/site_settings?select=value&key=eq.${SETTING_KEY}&limit=1`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      }
    )

    if (!response.ok) {
      return false
    }

    const rows = await response.json()
    const enabled = Boolean(rows?.[0]?.value)
    cachedMaintenance = {
      value: enabled,
      expiresAt: now + CACHE_MS,
    }
    return enabled
  } catch (error) {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const maintenanceEnabled = FORCE_MAINTENANCE || (await getMaintenanceMode())
  if (!maintenanceEnabled) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl
  if (isBypassedPath(pathname)) {
    return NextResponse.next()
  }

  const maintenanceUrl = request.nextUrl.clone()
  maintenanceUrl.pathname = '/maintenance'
  return NextResponse.rewrite(maintenanceUrl)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
