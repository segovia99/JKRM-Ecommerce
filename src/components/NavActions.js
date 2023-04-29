import Link from 'next/link'
import Login from './Login'
import { useIsLogin } from '@/store/loginStore'
import { ProfileIcon } from './Icons'

export default function NavActions () {
  const islogin = useIsLogin(state => state.isLogin)
  // console.log(islogin)
  return (
    <div className='flex h-full flex-1 items-center justify-end space-x-6'>

      {islogin
        ? (<><span><ProfileIcon /></span></>)
        : (
          <>
            <button
              data-modal-target='authentication-modal' data-modal-toggle='authentication-modal'
              className='flex h-full items-center border-b-2 text-sm border-primary text-primary'
            >
              Inicia sesión
            </button>
            <span className='h-6 w-px bg-gray-400' aria-hidden='true' />
            <Link
              href='/signup'
              className='flex h-full items-center border-b-2 text-sm'
            >
              Regístrate
            </Link>
            <Login />
          </>
          )}

    </div>
  )
}
