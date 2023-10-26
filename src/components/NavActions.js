import Link from 'next/link'
import Login from './Login'
import { ProfileIcon } from './Icons'
import { useSession } from 'next-auth/react'

export default function NavActions () {
  // const { isLogin, user } = useUserStore()
  const { data: session } = useSession()

  return (
    <div className='flex h-full flex-1 items-center justify-end space-x-6'>

      {session
        ? (
          // <div className='dropdown dropdown-end cursor-pointer'>
          <Link href='/profile' className='flex gap-2'>
            <span tabIndex={0}>
              <ProfileIcon />
            </span>
            <h1>{session.user?.nombre} {session.user?.apellido}
            </h1>
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
