import SearchMobile from './SearchMobile'
import Link from 'next/link'
import { useAdmin } from '@/hooks/useAdmin'
import { ArrowRightIcon } from './Icons'
import BuildingStorefrontIcon from '@heroicons/react/24/outline/BuildingStorefrontIcon'
import UserPlusIcon from '@heroicons/react/24/outline/UserPlusIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import ArchiveBoxIcon from '@heroicons/react/24/outline/ArchiveBoxIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon'
import { useSession } from 'next-auth/react'

function LeftMenu () {
  const { setIsOpen, isOpen } = useAdmin()
  const { data: session } = useSession()

  const close = (e) => {
    setIsOpen(false)
  }
  return (
    <>
      <div
        className={(isOpen ? 'w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed  top-0 z-50 left-0 lg:hidden' : 'w-[280px] transition-all duration-300 ease-in-out h-screen overflow-y-auto overflow-x-hidden overflow-style-none bg-white fixed top-0 z-50 -left-[280px] lg:hidden')}
        data-theme='light'
      >

        <div className='w-full mt-5 px-4'>
          <SearchMobile />
        </div>
        <div className='w-full mt-5'>
          <ul>

            {
            session
              ? (
                <>
                  <li onClick={() => close()}>
                    <Link href={`/account/${session.user.id}`}>
                      <div className=' flex justify-between items-center px-5 h-12 bg-white hover:bg-primary transition-all duration-300 ease-in-out cursor-pointer'>
                        <div className='flex items-center space-x-6'>
                          <span className='w-4 h-4'><UserIcon /></span>
                          <span className='text-sm font-400'>Cuenta</span>
                        </div>
                        <span>
                          <ArrowRightIcon />
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li onClick={() => close()}>
                    <Link href='/orders'>
                      <div className=' flex justify-between items-center px-5 h-12 bg-white hover:bg-primary transition-all duration-300 ease-in-out cursor-pointer'>
                        <div className='flex items-center space-x-6'>
                          <span className='w-4 h-4'><ArchiveBoxIcon /></span>
                          <span className='text-sm font-400'>Mis Pedidos</span>
                        </div>
                        <span>
                          <ArrowRightIcon />
                        </span>
                      </div>
                    </Link>
                  </li>
                </>
                )
              : (
                <>
                  <li onClick={() => close()}>
                    <Link href='/login'>
                      <div className=' flex justify-between items-center px-5 h-12 bg-white hover:bg-primary transition-all duration-300 ease-in-out cursor-pointer'>
                        <div className='flex items-center space-x-6'>
                          <span className='w-4 h-4'><UserIcon /></span>
                          <span className='text-sm font-400'>Iniciar Sesion</span>
                        </div>
                        <span>
                          <ArrowRightIcon />
                        </span>
                      </div>
                    </Link>
                  </li>

                  <li onClick={() => close()}>
                    <Link href='/signup'>
                      <div className=' flex justify-between items-center px-5 h-12 bg-white hover:bg-primary transition-all duration-300 ease-in-out cursor-pointer'>
                        <div className='flex items-center space-x-6'>
                          <span className='w-4 h-4'><UserPlusIcon /></span>
                          <span className='text-sm font-400'>Registrate</span>
                        </div>
                        <span>
                          <ArrowRightIcon />
                        </span>
                      </div>
                    </Link>
                  </li>
                </>
                )
           }

            <li onClick={() => close()}>
              <Link href='/catalogo'>
                <div className=' flex justify-between items-center px-5 h-12 bg-white hover:bg-primary transition-all duration-300 ease-in-out cursor-pointer'>
                  <div className='flex items-center space-x-6'>
                    <span className='w-4 h-4'><BuildingStorefrontIcon /></span>
                    <span className='text-sm font-400'>Catalogo</span>
                  </div>
                  <span>
                    <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            </li>

            <li onClick={() => close()}>
              <Link href='/about'>
                <div className=' flex justify-between items-center px-5 h-12 bg-white hover:bg-primary transition-all duration-300 ease-in-out cursor-pointer'>
                  <div className='flex items-center space-x-6'>
                    <span className='w-4 h-4'><InformationCircleIcon /></span>
                    <span className='text-sm font-400'>Sobre nosotros</span>
                  </div>
                  <span>
                    <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            </li>

            <li onClick={() => close()}>
              <Link href='/about'>
                <div className=' flex justify-between items-center px-5 h-12 bg-white hover:bg-primary transition-all duration-300 ease-in-out cursor-pointer'>
                  <div className='flex items-center space-x-6'>
                    <span className='w-4 h-4'><EnvelopeIcon /></span>
                    <span className='text-sm font-400'>Contactanos</span>
                  </div>
                  <span>
                    <ArrowRightIcon />
                  </span>
                </div>
              </Link>
            </li>

          </ul>
        </div>
      </div>
      {
        isOpen && (
          <div className='w-full h-screen bg-black bg-opacity-40 z-40 left-0 top-0 fixed lg:hidden' onClick={() => close()} />

        )
      }
    </>
  )
}

export default LeftMenu
