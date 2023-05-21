import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware (request) {
  const jwt = request.cookies.get('token')

  if (!jwt) return NextResponse.redirect(new URL('/', request.url))

  try {
    await jwtVerify(
      jwt.value,
      new TextEncoder().encode('jkrm')
    )
    // console.log({ payload })
    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*']
}
