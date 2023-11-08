import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import { useAdmin } from '@/hooks/useAdmin'
import Avatar from '../Avatar'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

export default function Header () {
  const { data: session } = useSession()

  const initialTheme = () => {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('theme')) {
        console.log('el tema es nu')
        return window.localStorage.setItem('theme', 'light')
      } else {
        return localStorage.getItem('theme')
      }
    }
  }
  const [currentTheme, setCurrentTheme] = useState(initialTheme)
  const { pageTitle } = useAdmin()
  const router = useRouter()
  const logoutUser = async () => {
    await signOut()
    router.push('/')
  }

  useEffect(() => {
    themeChange(false)
    if (currentTheme === null) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setCurrentTheme('dark')
      } else {
        setCurrentTheme('light')
      }
    }
    // 👆 false parameter is required for react project
  }, [])

  return (
    <>
      <div className='navbar  flex justify-between bg-base-100  z-10 shadow-md '>

        {/* Menu toogle for mobile view or small screen */}
        <div className=''>
          <label htmlFor='left-sidebar-drawer' className='btn btn-primary drawer-button lg:hidden'>
            <Bars3Icon className='h-5 inline-block w-5' />
          </label>
          <h1 className='text-2xl font-semibold ml-2'>{pageTitle}</h1>
        </div>

        <div className='order-last'>

          {/* Light and dark theme selection toogle **/}
          <label className='swap '>
            <input type='checkbox' />
            <SunIcon data-set-theme='light' data-act-class='ACTIVECLASS' className={'fill-current w-6 h-6 ' + (currentTheme === 'dark' ? 'swap-on' : 'swap-off')} />
            <MoonIcon data-set-theme='dark' data-act-class='ACTIVECLASS' className={'fill-current w-6 h-6 ' + (currentTheme === 'light' ? 'swap-on' : 'swap-off')} />
          </label>

          {/* Notification icon */}
          {/* <button className='btn btn-ghost ml-4  btn-circle'>
            <div className='indicator'>
              <BellIcon className='h-6 w-6' /> */}
          {/* {noOfNotifications > 0 ? <span className='indicator-item badge badge-secondary badge-sm'>{noOfNotifications}</span> : null} */}
          {/* </div>
          </button> */}

          {/* Profile icon, opening menu on click */}
          <h1 className='px-4'>{session.user.nombre} {session.user.apellido}</h1>
          <div className='dropdown dropdown-end ml-4'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar flex'>
              <div className='w-10 rounded-full'>
                <Avatar />
              </div>

            </label>

            <ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>

              {/* <li className=''><Link href='/app/settings-billing'>Bill History</Link></li> */}
              <div className='divider mt-0 mb-0' />
              <li><a onClick={logoutUser}>Cerrar Sesión</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
