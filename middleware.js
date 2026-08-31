import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname === '/Tarifs-Lavage-auto') {
    const url = request.nextUrl.clone()
    url.pathname = '/tarifs-lavage-auto'
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/Tarifs-Lavage-auto'],
}
