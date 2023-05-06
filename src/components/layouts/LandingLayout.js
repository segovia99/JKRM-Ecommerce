import Head from 'next/head'
import LandingNavbar from '@/components/LandingNavbar'
import Footer from '@/components/Footer'
import { useEffect } from 'react'
import { useIsLogin } from '@/store/loginStore'

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

      <Head>
        <title>Ferreteria</title>
        <meta name='description' content='Tienda enlinea de la ferreteria JKRM' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='og:image' content='/og.png' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <LandingNavbar />

      <main>
        {children}
      </main>
      <Footer />

    </>
  )
}

export default LandingLayout
