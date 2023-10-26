import InputText from '@/components/Input/InputText'
import TextAreaInput from '@/components/Input/TextAreaInput'
import TitleCard from '@/components/admin/Cards/TitleCard'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useSession } from 'next-auth/react'

export default function Account () {
  const { data: session } = useSession()

  // Call API to update profile settings changes
  const updateProfile = () => {
    ///
  }

  const updateFormValue = ({ updateType, value }) => {
    //
  }
  return (
    <LandingLayout>
      <div className='w-full pt-0 pb-0'>
        <div className='container-x mx-auto py-5'>
          <TitleCard title='Configuracin del Perfil' topMargin='pt-2'>

            {
              session && (
                <>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <InputText labelTitle='Nombre' defaultValue={session.user.nombre} updateFormValue={updateFormValue} />
                    <InputText labelTitle='Apellido' defaultValue={session.user.apellido} updateFormValue={updateFormValue} />
                    <InputText labelTitle='Correo' defaultValue={session.user.email} updateFormValue={updateFormValue} />
                    <TextAreaInput labelTitle='Dirección' defaultValue={session.user.direccion} updateFormValue={updateFormValue} />
                  </div>
                  <div className='divider' />

                  <div className='mt-16'><button className='btn btn-primary float-right' onClick={() => updateProfile()}>Actualizar</button></div>
                </>
              )
            }
          </TitleCard>
        </div>
      </div>
    </LandingLayout>
  )
}
