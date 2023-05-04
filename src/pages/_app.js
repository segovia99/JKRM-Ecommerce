
import '@/styles/globals.css'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import '../../node_modules/aos/dist/aos.css'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'
import { CartProvider } from '@/context/cart.js'

export default function App ({ Component, pageProps }) {
  return (

    <>
      <CartProvider>
        <CookiesProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </CookiesProvider>
      </CartProvider>
    </>

  )
}
