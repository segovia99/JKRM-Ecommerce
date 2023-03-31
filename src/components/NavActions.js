import Link from 'next/link'
// import { useOptionalUser } from '~/utils'

export default function NavActions () {
//   const user = useOptionalUser()
  return (
    <div className='flex h-full flex-1 items-center justify-end space-x-6'>

      <>
        <Link
          href='/login'
          className='flex h-full items-center border-b-2 text-sm border-primary text-primary'
        >
          Inicia sesión
        </Link>
        <span className='h-6 w-px bg-gray-400' aria-hidden='true' />
        <Link
          href='/join'
          className='flex h-full items-center border-b-2 text-sm'

        >
          Regístrate
        </Link>
      </>

      {/* <CartPreview /> */}
    </div>
  )
}
