import Link from 'next/link'
import Login from './Login'
import { useUserStore } from '@/store/loginStore'
import { ProfileIcon } from './Icons'

export default function NavActions () {
  const { isLogin } = useUserStore()

  return (
    <div className='flex h-full flex-1 items-center justify-end space-x-6'>

      {isLogin
        ? (
          // <div className='dropdown dropdown-end cursor-pointer'>
          <Link href='/profile'>
            <span tabIndex={0}>
              <ProfileIcon />
            </span>
          </Link>

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
