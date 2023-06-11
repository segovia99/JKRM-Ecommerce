import BellIcon from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { themeChange } from 'theme-change'
import { useAdmin } from '@/hooks/useAdmin'
import Avatar from '../Avatar'
import axios from 'axios'
import { useUserStore } from '@/store/loginStore'
import { useRouter } from 'next/router'

export default function Header () {
  const [currentTheme, setCurrentTheme] = useState('light')
  const { pageTitle } = useAdmin()
  const { setIsLogin } = useUserStore()
  const router = useRouter()
  const logoutUser = async () => {
    await axios.put('/api/auth/logout')
    setIsLogin(false)
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

          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection,
also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
    <option disabled selected>Theme</option>
    <option value="light">Default</option>
    <option value="dark">Dark</option>
    <option value="corporate">Corporate</option>
    <option value="retro">Retro</option>
</select> */}

          {/* Light and dark theme selection toogle **/}
          <label className='swap '>
            <input type='checkbox' />
            <SunIcon data-set-theme='light' data-act-class='ACTIVECLASS' className={'fill-current w-6 h-6 ' + (currentTheme === 'dark' ? 'swap-on' : 'swap-off')} />
            <MoonIcon data-set-theme='dark' data-act-class='ACTIVECLASS' className={'fill-current w-6 h-6 ' + (currentTheme === 'light' ? 'swap-on' : 'swap-off')} />
          </label>

          {/* Notification icon */}
          <button className='btn btn-ghost ml-4  btn-circle'>
            <div className='indicator'>
              <BellIcon className='h-6 w-6' />
              {/* {noOfNotifications > 0 ? <span className='indicator-item badge badge-secondary badge-sm'>{noOfNotifications}</span> : null} */}
            </div>
          </button>

          {/* Profile icon, opening menu on click */}
          <div className='dropdown dropdown-end ml-4'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <Avatar />
              </div>
            </label>
            <ul tabIndex={0} className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'>
              <li className='justify-between'>
                <Link href='/app/settings-profile'>
                  Cuenta
                  {/* <span className='badge'>New</span> */}
                </Link>
              </li>
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
