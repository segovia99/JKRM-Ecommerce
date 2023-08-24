import Head from 'next/head'
import { useRef, Suspense } from 'react'
import Header from '../admin/Header'

import SuspenseContent from '../admin/SuspenseContent'
import SidebarI from './SidebarI'
import RightSidebar from '../admin/RightSidebar'

export default function LayoutI ({ children }) {
  const mainContentRef = useRef(null)
  return (
    <>

      <Head>
        <title>Ferreteria</title>
        <meta name='description' content='Tienda enlinea de la ferreteria JKRM' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='drawer drawer-mobile'>
        <input id='left-sidebar-drawer' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col '>
          <Header />
          <main className='flex-1 overflow-y-auto pt-8 px-6  bg-base-200' ref={mainContentRef}>
            <Suspense fallback={<SuspenseContent />}>
              {children}
            </Suspense>
            <div className='h-16' />
          </main>
        </div>
        <SidebarI />
      </div>
      {/* Right drawer - containing secondary content.. */}
      <RightSidebar />
    </>
  )
}
