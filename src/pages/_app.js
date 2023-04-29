
import '@/styles/globals.css'
import '../../public/modal.js'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { CookiesProvider } from 'react-cookie'
import { ToastContainer } from 'react-toastify'

export default function App ({ Component, pageProps }) {
  return (

    <>
      <CookiesProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </CookiesProvider>
    </>

  )
}
