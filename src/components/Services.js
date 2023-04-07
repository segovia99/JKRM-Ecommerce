import { Cart2Icon, PaymentIcon, QualityIcon } from './Icons'

function Services () {
  return (
    <div data-aos='fade-up' className='best-services w-full bg-white flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center lg:h-[110px] px-10 lg:py-0 py-10 aos-init aos-animate'>
      <div className='item'>
        <div className='flex space-x-5 items-center'>
          <div>
            <span>
              <Cart2Icon />
            </span>
          </div>
          <div>
            <p className='text-black text-[15px] font-bold tracking-wide mb-1'>Envio Gratis</p>
            <p className='text-sm text-gray-400'>En ordenes de mas de $100</p>
          </div>
        </div>
      </div>
      <div className='item'>
        <div className='flex space-x-5 items-center'>
          <div>
            <span><PaymentIcon /></span>
          </div>
          <div>
            <p className='text-black text-[15px] font-bold tracking-wide mb-1'>Pago seguro</p>
            <p className='text-sm text-gray-400'>Pago en línea 100% seguro</p>
          </div>
        </div>
      </div>
      <div className='item'>
        <div className='flex space-x-5 items-center'>
          <div>
            <span><QualityIcon /></span>
          </div>
          <div>
            <p className='text-black text-[15px] font-bold tracking-wide mb-1'>La Mejor Calidad</p>
            <p className='text-sm text-gray-400'>Producto original garantizado</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
