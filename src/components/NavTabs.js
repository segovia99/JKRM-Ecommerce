import Link from 'next/link'
import { DropdownIcon, MenuHamburgerIcon } from './Icons'

const navigation = {
  pages: [
    {
      name: 'Inicio',
      href: '/'
    },
    {
      name: 'Catálogo',
      href: '/'
    },
    {
      name: 'Sobre nosotros',
      href: '/'
    },
    {
      name: 'Contactanos',
      href: '/'
    }
  ]
}

export default function NavTabs () {
  return (
    <>
      <div className='nav-widget-wrapper w-full  h-[60px] relative z-30 bg-[#db1436]  quomodo-shop-nav-bar lg:block hidden'>
        <div className='container-x mx-auto h-full'>
          <div className='w-full h-full relative'>
            <div className='w-full h-full flex justify-between items-center'>
              <div className='category-and-nav flex xl:space-x-7 space-x-3 items-center'>
                <div className='category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative ml-96'>
                  <button type='button' className='w-full h-full flex justify-between items-center'>
                    <div className='flex space-x-3 items-center'>
                      <span><MenuHamburgerIcon /></span>
                      <span className='text-sm font-600 text-qblacktext'>Todas las Categorias</span>
                    </div>
                    <div>
                      <span><DropdownIcon /></span>
                    </div>
                  </button>
                  <div className='category-dropdown w-full absolute left-0 top-[53px] overflow-hidden' />
                </div>
                <div className='nav'>
                  <ul className='nav-wrapper flex xl:space-x-10 space-x-5'>
                    {
                        navigation.pages.map((page) => (
                          <li key={page.name}>
                            <Link href={page.href}>
                              <span className='flex items-center text-sm font-semibold cursor-pointer text-white'>{page.name}</span>
                            </Link>
                          </li>
                        ))
                      }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
