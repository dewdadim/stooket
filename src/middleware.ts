import { NextResponse, type NextRequest } from 'next/server'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from '@/routes'

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const isLoggedIn = cookies.has('__Secure-next-auth.session-token')

  const headers = new Headers(request.headers)
  headers.set('x-current-path', request.nextUrl.pathname)

  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute =
    privateRoutes.includes(nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/purchase') ||
    request.nextUrl.pathname.startsWith('/settings') ||
    request.nextUrl.pathname.startsWith('/purchases') ||
    request.nextUrl.pathname.startsWith('/seller-dashboard')
  const isAuthRoute =
    authRoutes.includes(nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/forgot-password') ||
    request.nextUrl.pathname.startsWith('/reset-password')

  if (isApiAuthRoute) {
    return null
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next({
    request: {
      headers: headers,
    },
  })
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
