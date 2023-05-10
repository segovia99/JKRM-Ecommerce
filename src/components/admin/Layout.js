import Head from 'next/head'
import Sidebar from './Sidebar'

export default function Layout ({ children, selection }) {
  return (
    <>
      <Head>
        <title>Ferreteria</title>
        <meta name='description' content='Tienda enlinea de la ferreteria JKRM' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Sidebar selection={selection} />
      <main className='p-4 sm:ml-64'>
        {children}
      </main>
    </>
  )
}
