import Link from 'next/link'
import { Cart3Icon } from './Icons'

function ProductCardOne () {
  return (
    <div className='product-card-one w-full h-full bg-white relative group overflow-hidden' style={{ boxShadow: ' rgba(0, 0, 0, 0.05) 0px 15px 64px 0px' }}>
      <div className='product-card-img w-full h-[300px]' style={{ background: 'url("/Products/producto.jpg") center center no-repeat' }} />
      <div className='product-card-details px-[30px] pb-[30px] relative'>
        <div className='absolute w-full h-10 px-[30px] left-0 top-40 group-hover:top-[50px] transition-all duration-300 ease-in-out'>
          <button className='red-btn text-white'>
            <div className='flex items-center space-x-3'>
              <span className='text-white'>
                <Cart3Icon />
              </span>
              <span className='text-white'>Agregar al Carrito</span>
            </div>
          </button>
        </div>
        <Link href='/'>
          <p className='title mb-2 text-[15px] font-600 text-black leading-[24px] line-clamp-2 hover:text-blue-600'>
            COMBO ESMERIL ANGULAR 9 PLG 2200 W + MINI ESMERIL 4-1/2 PLG 700 W
          </p>
        </Link>
        <p className='price'>
          <span className=' text-red-600 font-600 text-[18px] ml-2'>
            $199.00
          </span>
        </p>
      </div>
    </div>
  )
}

export default ProductCardOne