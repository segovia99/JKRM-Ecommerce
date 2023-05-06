import CartList from '@/components/CartList'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useCart } from '@/hooks/useCart'

export default function Cart () {
  const { cart, removeFromCart } = useCart()
  return (
    <LandingLayout>
      <div className='w-full  pt-0 pb-0'>
        <div className='cart-page-wrapper w-full bg-white pb-[60px]'>
          <div className='w-full'>
            <div className='capage-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10'>
              <div className='container-x mx-auto'>
                <div className='flex justify-center'>
                  <h1 className='text-3xl font-semibold text-qblack'>Tu Carrito</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full mt-[8px]'>
            <div className='container-x mx-auto'>
              <div className='w-full mb-[30px]'>
                <div className='relative w-full overflow-x-auto border border-[#EDEDED]'>
                  <CartList products={cart} removeFromCart={removeFromCart} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  )
}
