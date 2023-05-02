import { useIsLogin } from '@/store/loginStore'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Login () {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const router = useRouter()
  const { setIsLogin } = useIsLogin()
  const isLogin = useIsLogin(state => state.isLogin)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(credentials)
    let idtoast
    try {
      idtoast = toast.loading('Comprobando Informacion')
      const res = await axios.post('/api/auth/login', credentials)
      // console.log(res.data)

      if (res.status === 200 && res.data.rol === 1) {
        const { name } = res.data
        toast.update(idtoast, { render: `Bienvenido ${name}`, autoClose: 1000, type: 'success', isLoading: false })
        router.push('/admin/dashboard')
      }
      if (res.status === 200 && res.data.rol === 2) {
        const { name } = res.data
        console.log(isLogin)
        setIsLogin()
        console.log(isLogin)
        localStorage.setItem('isLogin', JSON.stringify(true))
        toast.update(idtoast, { render: `Bienvenido ${name}`, autoClose: 1000, type: 'success', isLoading: false })
      }
    } catch (error) {
      toast.update(idtoast, { render: 'Email o contraseña incorrectos', autoClose: 2000, type: 'error', isLoading: false })
      console.log(error)
    }
  }

  return (
    <>
      <div id='authentication-modal' tabIndex='-1' aria-hidden='true' className='fixed inset-0 hidden flex items-center justify-center bg-black bg-opacity-30  top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
        <div className='relative w-full max-w-md max-h-full'>
          {/* <!-- Modal content --> */}
          <div className='relative bg-white rounded-lg shadow '>
            <button type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center' data-modal-hide='authentication-modal'>
              <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd' /></svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900'>Inicie sesión</h3>
              <form className='space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 '>Correo electrónico</label>
                  <input
                    type='email' name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='name@company.com' required
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
                    type='password' name='password' id='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark1:bg-gray-600 dark1:border-gray-500 dark1:placeholder-gray-400 dark1:text-white' required
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
                  ¿No estas registrado? <a href='#' className='text-blue-700 hover:underline dark1:text-blue-500'>Crea una cuenta</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
