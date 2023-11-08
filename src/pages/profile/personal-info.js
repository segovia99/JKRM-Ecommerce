import TitleCard from '@/components/admin/Cards/TitleCard'
import Layout from '@/components/customerinfo/Layout'
import LandingLayout from '@/components/layouts/LandingLayout'
import axios from 'axios'
import { Form, Formik } from 'formik'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PersonalInfo = () => {
  const { data: session } = useSession()
  const [info, setInfo] = useState({})
  const [state, setState] = useState(false)

  // Call API to update profile settings changes
  const updateProfile = async (values) => {
    await axios.put('/api/users', { id: session.user.id, ...values })
    toast.success('Informacion Actualizada', { position: 'top-center', autoClose: 1500 })
  }

  const getInfo = async () => {
    const res = await axios.post('/api/cliente', { id: session.user.id })
    setInfo(res.data)
    setState(true)
  }

  useEffect(() => {
    if (session) {
      getInfo()
    }
  }, [session])

  return (
    <LandingLayout>
      <Layout>
        <div className='flex-1'>
          <div className='w-full pt-0 pb-0'>
            <div className='container-x mx-auto py-5'>
              <TitleCard topMargin='pt-2'>

                {
                  state && (
                    <>

                      <Formik
                        initialValues={info}
                        enableReinitialize
                        onSubmit={async (values) => {
                          updateProfile(values)
                        }}
                      >
                        {
                      ({ handleChange, handleSubmit, values, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div className='form-control w-full'>
                              <label className='label'>
                                <span className='label-text text-base-content '>Nombre</span>
                              </label>
                              <input type='text' name='nombre' value={values.nombre} placeholder='' className='input  input-bordered w-full ' onChange={handleChange} />
                            </div>

                            <div className='form-control w-full'>
                              <label className='label'>
                                <span className='label-text text-base-content '>Apellido</span>
                              </label>
                              <input type='text' name='Apellido' value={values.apellido} placeholder='' className='input  input-bordered w-full ' onChange={handleChange} />
                            </div>

                            <div className='form-control w-full'>
                              <label className='label'>
                                <span className='label-text text-base-content '>Direccion</span>
                              </label>
                              <textarea name='direccion' placeholder='' value={values.direccion} className='textarea textarea-bordered w-full' onChange={handleChange} />
                            </div>

                          </div>
                          <div className='divider' />

                          <div className='mt-16'><button type='submit' className='btn btn-primary float-right'>Actualizar</button></div>
                        </Form>
                      )
                     }
                      </Formik>

                    </>
                  )
                }
              </TitleCard>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default PersonalInfo
