import Head from 'next/head'
import LandingNavbar from '@/components/LandingNavbar'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import { useIsLogin } from '@/store/loginStore'
import { CartProvider } from '@/context/cart'

const LandingLayout = ({ children }) => {
  const { setIsLogin } = useIsLogin()
  useEffect(() => {
    const islogin = JSON.parse(localStorage.getItem('isLogin'))
    // console.log(islogin)

    if (islogin) {
      setIsLogin(islogin)
    }
  }, [])
  return (
    <>
      <CartProvider>
        <Head>
          <title>Ferreteria</title>
          <meta name='description' content='Tienda enlinea de la ferreteria JKRM' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <LandingNavbar />

        <main>
          {children}
        </main>
        <Footer />
      </CartProvider>
    </>
  )
}

export default LandingLayout
