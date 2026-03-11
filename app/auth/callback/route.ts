import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const nextParam = requestUrl.searchParams.get('next')
  const nextPath = nextParam && nextParam.startsWith('/') ? nextParam : '/admin/dashboard'

  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      const loginUrl = new URL('/admin/login', requestUrl.origin)
      loginUrl.searchParams.set('error', 'auth_callback_failed')
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.redirect(new URL(nextPath, requestUrl.origin))
}
