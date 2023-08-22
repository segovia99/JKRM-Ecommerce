import Link from 'next/link'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRouter } from 'next/router'
import { RoutesI } from './MenuI'

export default function SidebarI () {
  const location = useRouter()

  const close = (e) => {
    document.getElementById('left-sidebar-drawer').click()
  }
  return (
    <>

      <div className='drawer-side '>
        <label htmlFor='left-sidebar-drawer' className='drawer-overlay' />
        <ul className='menu  pt-2 w-80 bg-base-100 text-base-content'>
          <button className='btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden' onClick={() => close()}>
            <XMarkIcon className='h-5 inline-block w-5' />
          </button>
          <li className='mb-2 font-semibold text-xl'>

            <Link href='/admin'><img className=' object-contain' src='/logo3.png' alt='Logo' /></Link>
          </li>
          {
                    RoutesI.map((route, k) => {
                      return (
                        <li className='' key={k}>
                          <Link
                            end
                            href={route.path}
                            className={`${location.pathname === route.path ? 'font-semibold  bg-base-200 ' : 'font-normal'}`}
                          >
                            {route.icon} {route.name}
                            {
                                                location.pathname === route.path
                                                  ? (<span
                                                      className='absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary '
                                                      aria-hidden='true'
                                                     />)
                                                  : null
                                            }
                          </Link>

                        </li>
                      )
                    })
                }

        </ul>
      </div>
    </>
  )
}
