
import Link from 'next/link'
import CartProductItem from './CartProductItem'
import { useCart } from '@/hooks/useCart'

function Cart () {
  const { cart, removeFromCart, calculateTotal } = useCart()

  return (

    <div className='w-[300px] bg-white border-t-[3px] cart-wrappwer  absolute -right-[115px] top-11 z-50 hidden group-hover:block' style={{ boxShadow: 'rgba(0, 0, 0, 0.14) 0px 15px 50px 0px' }}>
      <div className='w-full h-full'>
        {
        cart.length === 0 && (
          <div className='w-full h-full flex flex-col justify-center items-center'>
            <img src='/emptycart.webp' alt='empty-cart' className='w-full h-full' />
            <h4 className='font-semibold'>Tu carrito esta vacio</h4>
          </div>
        )
        }
        <div className='product-items h-[310px] overflow-y-scroll scrollable scrollbar-thin'>
          <ul>
            {
              cart.map(product => {
                return (
                  <li className='w-full h-full flex' key={product.id}>
                    <CartProductItem img={product.url} title={product.nombre} price={product.precio} id={product.id} removeFromCart={() => removeFromCart(product)} />
                  </li>
                )
              })
            }
          </ul>
        </div>
        {
          cart.length > 0 && (
            <>
              <div className='w-full px-4 mt-[20px] mb-[12px]'>
                <div className='h-[1px] bg-[#F0F1F3]' />
              </div>
              <div className='product-actions px-4 mb-[30px]'>
                <div className='total-equation flex justify-between items-center mb-[28px]'>
                  <span className='text-[15px] font-semibold text-qblack'>Total</span>
                  <span className='text-[15px] font-500 text-qred '>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className='product-action-btn'>
                  <Link href='/cart'>
                    <div className='gray-btn w-full h-[50px] mb-[10px] '>
                      <span>Ver Carrito</span>
                    </div>
                  </Link>
                  <Link href='/checkout'>
                    <div className='w-full h-[50px] mb-[10px]'>
                      <div className='red-btn'>
                        <span className='text-sm text-white'>Pagar</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>

  )
}

export default Cart
