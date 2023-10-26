import { withAuth } from 'next-auth/middleware'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware (req) {
    // console.log(req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return token?.rol === 1 || token?.rol === 3 || token?.rol === 4
      }
    },
    pages: {
      signIn: '/'

    }
  }

)

export const config = { matcher: ['/admin/:path*', '/Logistics/:path*', '/inventory'] }
