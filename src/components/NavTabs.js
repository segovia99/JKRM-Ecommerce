import Link from 'next/link'
import { DropdownIcon, MenuHamburgerIcon } from './Icons'
import { useState, useEffect } from 'react'
import axios from 'axios'

const navigation = {
  pages: [
    {
      name: 'Inicio',
      href: '/'
    },
    {
      name: 'Catálogo',
      href: '/catalogo'
    },
    {
      name: 'Sobre nosotros',
      href: '/about'
    },
    {
      name: 'Contactanos',
      href: '/'
    }
  ]
}

export default function NavTabs () {
  const [isActived, setIsActived] = useState(false)
  const [categories, setCategories] = useState([])
  const handledClick = () => {
    setIsActived(!isActived)
  }
  const loadCategory = async () => {
    const response = await axios.get('/api/categoriasCRUD/categorias')
    setCategories(response.data)
  }
  useEffect(() => {
    loadCategory()
  }, [])
  return (
    <>
      <div className='nav-widget-wrapper w-full  h-[60px] relative z-30 bg-[#db1436]  lg:block hidden'>
        <div className='mx-auto max-w-[1216px] h-full'>
          <div className='w-full h-full relative'>
            <div className='w-full h-full flex justify-between items-center'>
              <div className='category-and-nav flex xl:space-x-7 space-x-3 items-center'>
                <div className='category w-[270px] h-[53px] bg-white px-5 rounded-t-md mt-[6px] relative'>
                  <button onClick={() => handledClick()} type='button' className='w-full h-full flex justify-between items-center'>
                    <div className='flex space-x-3 items-center'>
                      <span><MenuHamburgerIcon /></span>
                      <span className='text-sm font-semibold text-black'>Todas las Categorias</span>
                    </div>
                    <div>
                      <span><DropdownIcon /></span>
                    </div>
                  </button>
                  {
                    isActived && <div onClick={() => handledClick()} className='fixed top-0 left-0 w-full h-full -z-10' />
                  }
                  <div className='category-dropdown w-full absolute left-0 top-[53px] overflow-hidden' style={{ height: isActived ? 924 : 0 }}>
                    <ul className='categories-list'>
                      {
                        categories.map((item, index) => {
                          return (
                            <li className='category-item border-t border-t-slate-200' key={index}>
                              <Link href={`/category/${item.id}`}>
                                <div className='flex justify-between items-center px-5 h-10 bg-white  transition-all duration-300 ease-in-out cursor-pointer text-qblack hover:bg-primary hover:text-white'>
                                  <div className='flex items-center justify-center pl-5'>
                                    <span className='text-xs font-400'>{item.nombre}</span>
                                  </div>
                                  <div><span><svg className='fill-current' width='6' height='9' viewBox='0 0 6 9' fill='none' xmlns='http://www.w3.org/2000/svg'><rect x='1.49805' y='0.818359' width='5.78538' height='1.28564' transform='rotate(45 1.49805 0.818359)' /><rect x='5.58984' y='4.90918' width='5.78538' height='1.28564' transform='rotate(135 5.58984 4.90918)' /></svg></span></div>
                                </div>
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
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
