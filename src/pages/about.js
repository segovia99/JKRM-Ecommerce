import LandingLayout from '@/components/layouts/LandingLayout'

const about = () => {
  return (
    <LandingLayout>
      <div>
        <div className='bg-[#000000] flex justify-center items-center relative overflow-hidden'>
          <div className='w-[100%] h-[100%] z-[20] absolute justify-center items-center flex'>
            <div className='text-[60px] lg:text-[120px] bold text-center z-[40] text-[#ffffff]'>JKRM</div>
            <hr />
          </div>
          <img className='opacity-20 w-[100%]' alt='hero' src='/hero_toolsjpg.jpg' />
        </div>
        <div className='bg-[#ffffff] pt-[40px]'>
          <div className='mx-[6%]'>
            <h2 className='text-[20px] md:text-[40px] text-[#4a4a4a] font-bold mb-[20px] text-center'>NOSOTROS</h2>
            <hr className='mt-[10px] mb-[10px]' />
            <div className='px-[2%] grow flex flex-wrap gap-[20px]'>
              <div className='basis-[100%] grow'>
                <h2 className='text-[#5c5a5a] text-[20px] mb-[20px] font-bold'>Qui&eacute;nes somos</h2>
                <p className='text-[#7a7979]'>
                  JKRM es una empresa del sector de herramientas con una amplia experiencia en el suministro de soluciones de alta calidad. Nos enorgullece ofrecer una amplia gama de herramientas innovadoras y duraderas que satisfacen las necesidades de profesionales y aficionados por igual.
                </p>
              </div>
              <div className='basis-[100%] md:basis-[40%] grow'>
                <h2 className='text-[#5c5a5a] text-[20px] mb-[20px] font-bold'>Misi&oacute;n</h2>
                <p className='text-[#7a7979]'>
                  En JKRM, nuestra misi&oacute;n es proporcionar a nuestros clientes las herramientas necesarias para alcanzar sus objetivos y superar los desaf&iacute;os que enfrentan en su trabajo diario. Nos comprometemos a ofrecer productos de calidad excepcional, dise&ntilde;ados con innovaci&oacute;n y durabilidad en mente.
                </p>
              </div>
              <div className='basis-[100%] md:basis-[40%] grow pb-[20px]'>
                <h2 className='text-[#5c5a5a] text-[20px] mb-[20px] font-bold'>Visi&oacute;n</h2>
                <p className='text-[#7a7979]'>
                  Nuestra visi&oacute;n en JKRM es convertirnos en el l&iacute;der mundial en el suministro de herramientas innovadoras y de alta calidad que impulsen la eficiencia y el &eacute;xito de nuestros clientes. Nos esforzamos por ser reconocidos como el referente en la industria, brindando soluciones confiables y superando constantemente las expectativas de nuestros clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  )
}

export default about
