import axios from 'axios'
import { Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

export default function Signup () {
  const router = useRouter()
  return (
    <section className='bg-gray-50 dark1:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Link href='/' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark1:text-white'>
          <img className=' mr-2 object-contain' width='156' height='36' src='/logo.webp' alt='logo' />
        </Link>
        <div className='w-full bg-white rounded-lg shadow dark1:border md:mt-0 sm:max-w-md xl:p-0 dark1:bg-gray-800 dark1:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark1:text-white'>
              Crear cuenta
            </h1>
            <Formik
              initialValues={{
                nombre: '',
                apellido: '',
                direccion: '',
                email: '',
                password: ''
              }}
              onSubmit={async (values, actions) => {
                let idtoast
                try {
                  idtoast = toast.loading('Registrando usuario')
                  axios.post('/api/register', values)
                    .then(() => {
                      toast.update(idtoast, {
                        render: 'Usuario registrado',
                        type: 'success',
                        isLoading: false,
                        autoClose: 2000
                      })
                      router.push('/')
                    })
                } catch (error) {

                }
              }}
            >
              {
          ({ handleChange, handleSubmit, values, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <div className='space-y-4 md:space-y-6'>
                <div className='grid gap-6 mb-6 md:grid-cols-2'>
                  <div>
                    <label for='first_name' className='block mb-2 text-sm font-medium text-gray-900'>Nombre</label>
                    <input type='text' id='first_name' name='nombre' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' onChange={handleChange} value={values.nombre} placeholder='John' required />
                  </div>
                  <div>
                    <label for='last_name' name='apellido' className='block mb-2 text-sm font-medium text-gray-900'>Apellido</label>
                    <input
                      type='text' id='last_name' name='apellido' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' placeholder='Doe' onChange={handleChange}
                      value={values.apellido} required
                    />
                  </div>
                </div>
                <div>
                  <label for='direccion' className='block mb-2 text-sm font-medium text-gray-900 dark1:text-white'>Dirección</label>
                  <input type='text' name='direccion' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark1:bg-gray-700 dark1:border-gray-600 dark1:placeholder-gray-400 dark1:text-white dark1:focus:ring-blue-500 dark1:focus:border-blue-500' onChange={handleChange} value={values.direccion} required='' />
                </div>
                <div>
                  <label for='email' className='block mb-2 text-sm font-medium text-gray-900 dark1:text-white'>correo electrónico</label>
                  <input type='email' name='email' id='email' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark1:bg-gray-700 dark1:border-gray-600 dark1:placeholder-gray-400 dark1:text-white dark1:focus:ring-blue-500 dark1:focus:border-blue-500' placeholder='name@company.com' onChange={handleChange} value={values.email} required='' />
                </div>
                <div>
                  <label for='password' className='block mb-2 text-sm font-medium text-gray-900 dark1:text-white'>contraseña</label>
                  <input type='password' name='password' id='password' placeholder='••••••••' className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark1:bg-gray-700 dark1:border-gray-600 dark1:placeholder-gray-400 dark1:text-white dark1:focus:ring-blue-500 dark1:focus:border-blue-500' onChange={handleChange} value={values.password} required='' />
                </div>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input id='terms' aria-describedby='terms' type='checkbox' className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark1:bg-gray-700 dark1:border-gray-600 dark1:focus:ring-primary-600 dark1:ring-offset-gray-800' required='' />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label for='terms' className='font-light text-gray-500 dark1:text-gray-300'>acepto los <a className='font-medium text-primary-600 hover:underline dark1:text-primary-500' href='#'>Terminos y Condiciones</a></label>
                  </div>
                </div>
                <button type='submit' className='w-full text-white bg-[#db1436] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Crear Cuenta</button>
                <p className='text-sm font-light text-gray-500 dark1:text-gray-400'>
                  ¿ya tengo una cuenta? <Link href='/' className='font-medium text-primary-600 hover:underline dark1:text-primary-500'>inicia  sesion aqui</Link>
                </p>
              </div>
            </Form>
          )
        }
            </Formik>
          </div>
        </div>
      </div>
    </section>
  )
}
