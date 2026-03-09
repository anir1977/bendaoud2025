import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const MAINTENANCE_MODE = true

function isBypassedPath(pathname: string) {
  if (pathname === '/maintenance') return true
  if (pathname.startsWith('/_next')) return true
  if (pathname.startsWith('/api')) return true
  if (pathname === '/favicon.ico') return true
  if (pathname === '/robots.txt') return true
  if (pathname === '/sitemap.xml') return true

  // Let static assets pass through.
  return /\.[a-zA-Z0-9]+$/.test(pathname)
}

export function middleware(request: NextRequest) {
  if (!MAINTENANCE_MODE) {
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
