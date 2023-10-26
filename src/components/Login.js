import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { signIn, getSession } from 'next-auth/react'
import Link from 'next/link'

export default function Login () {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const responseNextAuth = await signIn('credentials', {
      email: credentials.email,
      password: credentials.password,
      redirect: false
    })

    if (responseNextAuth?.error) {
      return toast.error(responseNextAuth.error, { position: 'top-center', autoClose: 1500 })
    }

    const session = await getSession()
    if (session) {
      if (session.user.rol === 1) router.push('/admin/dashboardsales')
      // if (session.user.rol === 2) router.push('/')
      if (session.user.rol === 3) router.push('/Logistics/pedidos')
      if (session.user.rol === 4) router.push('/inventory/inventario')
      return toast.success(`Bienvenido ${session.user.nombre}`, { position: 'top-center', autoClose: 1500 })
    }
  }

  return (
    <>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <div className='relative w-full max-w-md max-h-full'>
            {/* <!-- Modal content --> */}
            <div className='relative bg-white rounded-lg shadow '>
              <label htmlFor='my-modal' type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center' data-modal-hide='authentication-modal'>
                <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
                <span className='sr-only'>Close modal</span>
              </label>
              <div className='px-6 py-6 lg:px-8'>
                <h3 className='mb-4 text-xl font-medium text-gray-900'>Inicie sesión</h3>
                <form className='space-y-6' onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 '>Correo electrónico</label>
                    <input
                      type='email' name='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='name@company.com' required
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          email: e.target.value
                        })}
                    />
                  </div>
                  <div>
                    <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>Contraseña</label>
                    <input
                      type='password' name='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark1:bg-gray-600 dark1:border-gray-500 dark1:placeholder-gray-400 dark1:text-white' required
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value
                        })}
                    />
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex items-start'>
                      <div className='flex items-center h-5'>
                        <input id='remember' type='checkbox' value='' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark1:bg-gray-600 dark1:border-gray-500 dark1:focus:ring-blue-600 dark1:ring-offset-gray-800 dark1:focus:ring-offset-gray-800' />
                      </div>
                      <label htmlFor='remember' className='ml-2 text-sm font-medium text-gray-900 dark1:text-gray-300'>Recuerdame</label>
                    </div>
                    <a href='#' className='text-sm text-blue-700 hover:underline dark1:text-blue-500'>¿Olvidaste tu contraseña?</a>
                  </div>
                  <button type='submit' className='w-full text-white bg-[#db1436] hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark1:bg-blue-600 dark1:hover:bg-blue-700 dark1:focus:ring-blue-800'>Acceder</button>
                  <div className='text-sm font-medium text-gray-500 dark1:text-gray-300'>
                    ¿No estas registrado? <Link href='/signup' className='text-blue-700 hover:underline dark1:text-blue-500'>Crea una cuenta</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
