import Head from 'next/head'
import LandingNavbar from '@/components/LandingNavbar'
import Footer from '@/components/Footer'
import LeftMenu from '../LeftMenu'

const LandingLayout = ({ children }) => {
  return (
    <>

      <Head>
        <title>Ferreteria</title>
        <meta name='description' content='Tienda enlinea de la ferreteria JKRM' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='og:image' content='/og.png' />
        <link rel='icon' href='/favicon.ico' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' />
      </Head>

      <LandingNavbar />
      <LeftMenu />
      <main data-theme='light' className='bg-[#f8f8f8]'>
        {children}
      </main>
      <Footer />

    </>
  )
}

export default LandingLayout
