import Link from 'next/link'
import Login from './Login'
import { useIsLogin } from '@/store/loginStore'
import { ProfileIcon } from './Icons'

export default function NavActions () {
  const islogin = useIsLogin(state => state.isLogin)
  const { setIsLogin } = useIsLogin()
  // console.log(islogin)
  return (
    <div className='flex h-full flex-1 items-center justify-end space-x-6'>

      {islogin
        ? (
          <div className='dropdown cursor-pointer'>
            <span tabIndex={0}>
              <ProfileIcon />
            </span>
            <div>
              <ul tabIndex={0} className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-50'>
                <li><a>Cuenta</a></li>
                <li><a>Mis Pedidos</a></li>
                <li>
                  <button onClick={() => {
                    localStorage.removeItem('isLogin')
                    setIsLogin(false)
                  }}
                  >Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          </div>
          )
        : (
          <>
            <label
              htmlFor='my-modal'
              className='flex h-full items-center border-b-2 text-sm cursor-pointer'
            >
              Inicia sesión
            </label>
            <span className='h-6 w-px bg-gray-400' aria-hidden='true' />
            <Link
              href='/signup'
              className='flex h-full items-center border-b-2 text-sm cursor-pointer'
            >
              Regístrate
            </Link>
            <Login />
          </>
          )}

    </div>
  )
}
