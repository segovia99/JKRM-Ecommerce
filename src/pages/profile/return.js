import TitleCard from '@/components/admin/Cards/TitleCard'
import Layout from '@/components/customerinfo/Layout'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useUserStore } from '@/store/loginStore'

const PersonalInfo = () => {
  const makeEmail = () => {
    const info = {
      productName: document.querySelector('input[name="productName"]').value,
      name: document.querySelector('input[name="name"]').value,
      lastname: document.querySelector('input[name="lastname"]').value,
      email: document.querySelector('input[name="email"]').value,
      why: document.querySelector('input[name="why"]').value
    }

    console.log(info)
  }

  return (
    <LandingLayout>
      <Layout>
        <div className='flex-1'>
          <div className='w-full pt-0 pb-0'>
            <div className='container-x mx-auto py-5'>
              <TitleCard topMargin='pt-2'>
                <div className='flex flex-wrap gap-6'>
                  <div className='basis-[100%] md:basis-[40%] grow'>
                    <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Nombre del producto</div>
                    <div><input name='productName' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' /></div>
                  </div>
                  <div className='basis-[100%] md:basis-[40%] grow'>
                    <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Nombre</div>
                    <div><input name='name' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' /></div>
                  </div>
                  <div className='basis-[100%] md:basis-[40%] grow'>
                    <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Apellido</div>
                    <div><input name='lastname' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' /></div>
                  </div>
                  <div className='basis-[100%] md:basis-[40%] grow'>
                    <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Correo</div>
                    <div><input name='email' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' /></div>
                  </div>
                  <div className='basis-[100%] md:basis-[40%] grow'>
                    <div className='pl-[4px] pt-[8px] pb-[8px] text-[0.875rem]'>Motivo de retorno</div>
                    <div><input name='why' className='w-[100%] h-[3em] border-[1px] rounded-[0.5em] border-[silver]' type='text' /></div>
                  </div>
                </div>
                <div className='divider' />

                <div className='mt-16'><button className='btn btn-primary float-right' onClick={() => makeEmail()}>Hecho</button></div>
              </TitleCard>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default PersonalInfo
