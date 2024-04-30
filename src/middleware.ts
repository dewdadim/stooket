import type { NextRequest } from 'next/server'
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  privateRoutes,
} from '@/routes'

export function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request
  const isLoggedIn = cookies.has('next-auth.session-token')

  const isApiAuthRoute = request.nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPrivateRoute =
    privateRoutes.includes(nextUrl.pathname) ||
    request.nextUrl.pathname.startsWith('/buy')
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

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

  return null
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
