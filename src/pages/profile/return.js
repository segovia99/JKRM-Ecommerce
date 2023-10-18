import TitleCard from '@/components/admin/Cards/TitleCard'
import Layout from '@/components/customerinfo/Layout'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useUserStore } from '@/store/loginStore'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'

const PersonalInfo = () => {
  const router = useRouter()
  const { user } = useUserStore()
  const [isSend, setIsSend] = useState(false)

  const makeEmail = async () => {
    const { id } = router.query
    const info = {
      id,
      name: user.nombre,
      lastname: user.apellido,
      email: user.email,
      why: document.querySelector('input[name="why"]').value
    }
    const idtoast = toast.loading('Enviando Solicitud de devolucion', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    const res = await axios.post('/api/sendReturn', info)
    if (res.status === 200) {
      setIsSend(true)
      toast.update(idtoast, {
        render: 'Solicitud Enviada',
        type: 'success',
        isLoading: false,
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } else {
      toast.update(idtoast, {
        render: 'Ups algo salio mal',
        type: 'error',
        isLoading: false,
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  return (
    <LandingLayout>
      <Layout>
        <div className='flex-1'>
          <div className='w-full pt-0 pb-0'>
            <div className='container-x mx-auto py-5'>
              {
                isSend
                  ? (
                    <div className='mx-auto mb-8 grid max-w-3xl place-items-center text-center p-2' data-theme='light'>

                      <div className='break-words text-black py-24 mx-auto max-w-prose md:px-2'>

                        <p className='mb-8 text-black/90 max-w-xl text-justify'>
                          Estimado {user.nombre} {user.apellido},
                        </p>
                        <p className='mb-8 text-black/90 max-w-xl text-justify'>
                          Gracias por contactarnos con respecto a tu solicitud de devolución en Ferretería JKRM. Lamentamos los inconvenientes que puedas haber experimentado con tu pedido y estamos aquí para ayudarte a resolverlo de manera efectiva.
                        </p>

                        <p className='mb-8 text-black/90 max-w-xl text-justify'>
                          Hemos registrado tu solicitud de devolución y estamos trabajando diligentemente para procesarla de la manera más eficiente posible. En breve, recibirás un correo electrónico detallado con los procedimientos y pasos a seguir para completar la devolución de tu pedido.
                        </p>

                        <p className='mb-8 text-black/90 max-w-xl text-justify'>
                          Si tienes alguna pregunta adicional o necesitas asistencia durante este proceso, no dudes en ponerte en contacto con nuestro equipo de atención al cliente. Estamos aquí para brindarte el mejor servicio y asegurarnos de que tu experiencia con nosotros sea satisfactoria.
                        </p>

                        <p className='mb-8 text-black/90 max-w-xl text-justify'>
                          Gracias por confiar en Ferretería JKRM, y esperamos poder atender tus necesidades de manera satisfactoria en el futuro.
                        </p>

                        <p className='mb-8 text-black/90 max-w-xl text-justify'>
                          Atentamente,
                        </p>
                        <p className='mb-8 text-black/90 max-w-xl text-justify'>Equipo de atención al cliente de Ferretería JKRM</p>

                      </div>
                    </div>
                    )
                  : (
                    <TitleCard topMargin='pt-2'>
                      <div className='flex flex-wrap gap-6'>
                        <div className='basis-[100%] md:basis-[40%] grow'>
                          <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Nombre</div>
                          <div><input name='name' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' value={user.nombre} /></div>
                        </div>
                        <div className='basis-[100%] md:basis-[40%] grow'>
                          <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Apellido</div>
                          <div><input name='lastname' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' value={user.apellido} /></div>
                        </div>
                        <div className='basis-[100%] md:basis-[40%] grow'>
                          <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Correo</div>
                          <div><input name='email' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' value={user.email} /></div>
                        </div>
                        <div className='basis-[100%] md:basis-[40%] grow'>
                          <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Motivo de retorno</div>
                          <div><input name='why' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' /></div>
                        </div>
                      </div>
                      <div className='divider' />

                      <div className='mt-16'><button className='btn btn-primary float-right' onClick={() => makeEmail()}>Hecho</button></div>
                    </TitleCard>
                    )

              }
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default PersonalInfo
