
import Link from 'next/link'
import CartProductItem from './CartProductItem'
import { useCart } from '@/hooks/useCart'

function Cart () {
  const { cart, removeFromCart } = useCart()

  return (

    <div className='w-[300px] bg-white border-t-[3px] cart-wrappwer  absolute -right-[115px] top-11 z-50 hidden group-hover:block' style={{ boxShadow: 'rgba(0, 0, 0, 0.14) 0px 15px 50px 0px' }}>
      <div className='w-full h-full'>
        <div className='product-items h-[310px] overflow-y-scroll scrollable scrollbar-thin'>
          <ul>
            {
              cart.map(product => (
                <li className='w-full h-full flex' key={product.id}>
                  <CartProductItem img={product.url} title={product.nombre} price={product.precio} id={product.id} removeFromCart={() => removeFromCart(product)} />
                </li>
              ))
            }
          </ul>
        </div>
        <div className='w-full px-4 mt-[20px] mb-[12px]'>
          <div className='h-[1px] bg-[#F0F1F3]' />
        </div>
        <div className='product-actions px-4 mb-[30px]'>
          <div className='total-equation flex justify-between items-center mb-[28px]'>
            <span className='text-[15px] font-semibold text-qblack'>Subtotal</span>
            <span className='text-[15px] font-500 text-qred '>$0</span>
          </div>
          <div className='product-action-btn'>
            <Link href='/'>
              <div className='gray-btn w-full h-[50px] mb-[10px] '>
                <span>Ver Carrito</span>
              </div>
            </Link>
            <Link href='/'>
              <div className='w-full h-[50px] mb-[10px]'>
                <div className='red-btn'>
                  <span className='text-sm text-white'>Pagar</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Cart
