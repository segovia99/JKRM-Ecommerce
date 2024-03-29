
import '@/styles/globals.css'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import '../../node_modules/aos/dist/aos.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '@/styles/slick.min.css'
import '@/styles/slick-theme.min.css'

import { ToastContainer } from 'react-toastify'
import { CartProvider } from '@/context/cart.js'
import { AdminProvider } from '@/context/admin'
import { FiltersProvider } from '@/context/filters'
import { SessionProvider } from 'next-auth/react'

export default function App ({ Component, pageProps, session }) {
  return (

    <>
      <SessionProvider session={session}>
        <AdminProvider>
          <CartProvider>
            <FiltersProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </FiltersProvider>
          </CartProvider>
        </AdminProvider>
      </SessionProvider>
    </>

  )
}
