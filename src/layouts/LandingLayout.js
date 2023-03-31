import Head from 'next/head'
import LandingNavbar from '@/components/LandingNavbar'

const LandingLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Ferreteria</title>
        <meta name='description' content='Tienda enlinea de la ferreteria JKRM' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header>
        <LandingNavbar />
      </header>
      <main>
        {children}
      </main>
    </>
  )
}

export default LandingLayout
