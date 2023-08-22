import axios from 'axios'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify'

export default function UserModal ({ setUsuarios, isOpen, setIsOpen }) {
  const closeModal = () => {
    setIsOpen(false)
  }
  return (
    <>
      <input type='checkbox' id='modal-1' className='modal-toggle' />
      <div className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className='modal-box'>
          <button className='btn btn-sm btn-circle absolute right-2 top-2' onClick={() => closeModal()}>✕</button>
          <h3 className='font-semibold text-2xl pb-6 text-center'>Nuevo Usuario</h3>
          <Formik
            initialValues={{
              nombre: '',
              apellido: '',
              direccion: '',
              email: '',
              password: '',
              rol: ''
            }}
            enableReinitialize
            onSubmit={async (values, { resetForm }) => {
              try {
                axios.post('/api/users', values).then(() => {
                  toast.success('Usuario Registrado', {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                  })
                  fetch('/api/users')
                    .then(res => res.json())
                    .then(data => {
                      setUsuarios(data)
                    })
                })

                closeModal()
                resetForm()
              } catch (error) {

              }
            }}

          >
            {
            ({ handleChange, handleSubmit, values, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <div className='flex gap-4'>
                  <div className='form-control w-full max-w-xs'>
                    <label className='label'>
                      Nombre
                    </label>
                    <input
                      type='text' placeholder='Nombre' name='nombre' className='input input-bordered w-full max-w-xs'
                      onChange={handleChange} value={values.nombre} required
                    />
                  </div>

                  <div className='form-control w-full max-w-xs'>
                    <label className='label'>
                      Apellido
                    </label>
                    <input
                      type='text' placeholder='Apellido' name='apellido' className='input input-bordered w-full max-w-xs'
                      onChange={handleChange} value={values.apellido} required
                    />
                  </div>
                </div>

                <div className='form-control w-full'>
                  <label className='label'>
                    Correo
                  </label>
                  <input
                    type='text' placeholder='Correo' name='email' className='input input-bordered w-full '
                    onChange={handleChange} value={values.email} required
                  />
                </div>

                <div className='form-control w-full'>
                  <label className='label'>
                    Direccion
                  </label>
                  <input
                    type='text' placeholder='Direccion' name='direccion' className='input input-bordered w-full '
                    onChange={handleChange} value={values.direccion} required
                  />
                </div>

                <div className='form-control w-full'>
                  <label className='label'>
                    Contraseña
                  </label>
                  <input
                    type='password' placeholder='*********' name='password' className='input input-bordered w-full '
                    onChange={handleChange} value={values.password} required
                  />
                </div>

                <div className='form-control w-full'>
                  <label className='label'>
                    Seleccione el rol del usuario
                  </label>
                  <select className='select select-bordered w-full ' name='rol' onChange={handleChange} required>
                    <option disabled selected>rol</option>
                    <option value='1'>Administrador</option>
                    <option value='3'>Logistica</option>
                    <option value='4'>Inventarios</option>
                  </select>
                </div>

                <div className='modal-action'>
                  <button type='button' className='btn btn-ghost' onClick={() => closeModal()}>Cancelar</button>
                  <button type='submit' className='btn btn-primary px-6'>Guardar</button>
                </div>

              </Form>
            )
        }
          </Formik>
        </div>
      </div>
    </>
  )
}
