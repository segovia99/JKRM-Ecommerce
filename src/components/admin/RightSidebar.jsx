import { useAdmin } from '@/hooks/useAdmin'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'
function RightSidebar () {
  const { setIsOpen, isOpen, header, producto, formikRef, isUpdate, setProductosG } = useAdmin()

  const close = (e) => {
    setIsOpen(false)
  }
  const updateProduct = async (value) => {
    close()
    const resp = await axios.put('/api/inventory', value)
    setProductosG(resp.data)
    toast.success('Producto Actualizado', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }

  const newProduct = async (value) => {
    // console.log(value)
    close()
    const response = await axios.post('/api/inventory', value)
    setProductosG(response.data)
    toast.success('Producto Agregado', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
  return (
    <div className={' fixed overflow-hidden z-20 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out ' + (isOpen ? ' transition-opacity opacity-100 duration-500 translate-x-0  ' : ' transition-all delay-500 opacity-0 translate-x-full  ')}>

      <section className={'w-80 md:w-96  right-0 absolute bg-base-100 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  ' + (isOpen ? ' translate-x-0 ' : ' translate-x-full ')}>

        <div className='relative  pb-5 flex flex-col  h-full'>

          {/* Header */}
          <div className='navbar   flex pl-4 pr-4   shadow-md '>
            <button className='float-left btn btn-circle btn-outline btn-sm' onClick={() => close()}>
              <XMarkIcon className='h-5 w-5' />
            </button>
            <span className='ml-2 font-bold text-xl'>{header}</span>
          </div>

          {/* ------------------ Content Start ------------------ */}
          <div className='overflow-y-scroll pl-4 pr-4'>
            <div className='flex flex-col w-full'>
              {/* Loading drawer body according to different drawer type */}
              <Formik
                initialValues={producto}
                innerRef={formikRef}
                enableReinitialize
                onSubmit={async (values, { resetForm }) => {
                  try {
                    if (isUpdate) {
                      console.log(values)
                      updateProduct(values)
                      resetForm()
                    } else {
                      newProduct(values)
                      resetForm()
                    }
                  } catch (error) {
                    toast.error('Algo salio Mal', {
                      position: 'top-center',
                      autoClose: 1500,
                      hideProgressBar: true,
                      closeOnClick: false,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined
                    })
                  }
                }}
              >
                {
                  ({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form
                      onSubmit={handleSubmit}
                    >
                      <div className='form-control w-full'>
                        <label className='label'>
                          Nombre
                        </label>
                        <input
                          type='text' placeholder='Ingresa el nombre del productos' name='nombre' className='input input-bordered w-full '
                          onChange={handleChange} value={values.nombre} required
                        />
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          Precio
                        </label>
                        <input
                          type='text' placeholder='Ingresa el Precio' name='precio' className='input input-bordered w-full '
                          onChange={handleChange} value={values.precio} required
                        />
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          Stock
                        </label>
                        <input
                          type='text' placeholder='Ingresa el stock' name='cantidad' className='input input-bordered w-full '
                          onChange={handleChange} value={values.cantidad} required
                        />
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          Descripcion
                        </label>
                        <textarea
                          className='textarea textarea-bordered' placeholder='Ingresa una descripcion del producto' name='descripcion'
                          onChange={handleChange} value={values.descripcion} required
                        />
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          Imagen
                        </label>
                        <input
                          type='text' placeholder='Ingresa la url de la imagen' name='url' className='input input-bordered w-full '
                          onChange={handleChange} value={values.url} required
                        />
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          Marca
                        </label>
                        <input
                          type='text' placeholder='Ingresa la marca del producto' name='marca' className='input input-bordered w-full '
                          onChange={handleChange} value={values.marca} required
                        />
                      </div>
                      <div className='form-control w-full'>
                        <label className='label'>
                          Seleccione la categoria
                        </label>
                        <select className='select select-bordered w-full ' name='categoria' onChange={handleChange} value={values.categoria} required>
                          <option disabled selected>categorias</option>
                          <option value='1'>Herramientas</option>
                          <option value='3'>Hogar</option>
                          <option value='4'>Fontaneria</option>
                        </select>
                      </div>

                      <div className='flex justify-center items-center mt-4 mb-4 gap-4'>
                        <button type='submit' className='btn btn-primary px-6'>Guardar</button>
                        <button type='button' className='btn btn-ghost' onClick={() => close()}>Cancelar</button>
                      </div>
                    </Form>
                  )
                }

              </Formik>
            </div>
          </div>
          {/* ------------------ Content End ------------------ */}
        </div>

      </section>

      <section className=' w-screen h-full cursor-pointer ' onClick={() => close()} />
    </div>
  )
}

export default RightSidebar
