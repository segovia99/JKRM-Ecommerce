import { useCart } from '@/hooks/useCart'

export default function CartList ({ products, removeFromCart }) {
  const { incrementQuantity, decrementQuantity } = useCart()
  return (
    <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
      <thead>
        <tr className='text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase'>
          <th className='pointer py-4 pl-10 block whitespace-nowrap min-w-[300px]'>Producto</th>
          <th className='pointer py-4 whitespace-nowrap text-center'>Precio</th>
          <th className='pointer py-4 whitespace-nowrap text-center'>Cantidad</th>
          <th className='pointer py-4 whitespace-nowrap text-center'>SubTotal</th>
          <th className='pointer' />
          <th>      </th>
        </tr>
      </thead>
      <tbody>
        {products.length === 0 && (<tr className='bg-white border-b hover:bg-gray-50 text-center'><td colSpan={6}>No hay productos en el carrito</td></tr>)}
        {
          products.map((product) => {
            return (
              <tr key={product.id} className='bg-white border-b hover:bg-gray-50'>
                <td className='pl-10  py-4  w-[380px]'>
                  <div className='flex space-x-6 items-center'>
                    <div className='w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]'>
                      <img src={product.url} className='w-full h-full object-contain' />
                    </div>
                    <div className='flex-1 flex flex-col'>
                      <p className='font-medium text-[15px] text-qblack'>{product.nombre}</p>
                    </div>
                  </div>
                </td>
                <td className='text-center py-4 px-2'>
                  <div className='flex space-x-1 items-center justify-center'>
                    <span className='text-[15px] font-normal'>${parseFloat(product.descuento).toFixed(2)}</span>
                  </div>
                </td>
                <td className=' py-4'>
                  <div className='flex justify-center items-center'>
                    <div className='w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border'>
                      <div className='flex justify-between items-center w-full'>
                        <button type='button' className='text-base text-qgray' onClick={() => decrementQuantity(product)}>-</button>
                        <span className='text-qblack'>{product.quantity}</span>
                        <button type='button' className='text-base text-qgray' onClick={() => incrementQuantity(product)}>+</button>
                      </div>
                    </div>
                  </div>
                </td>
                <td className='text-right py-4'>
                  <div className='flex space-x-1 items-center justify-center'>
                    <span className='ttext-[15px] font-normal'>${product.subtotal.toFixed(2)}</span>
                  </div>
                </td>
                <td className='text-right py-4'>
                  <div className='flex space-x-1 items-center justify-center' onClick={() => removeFromCart(product)}>
                    <span>
                      <svg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z' fill='#AAAAAA' /></svg>
                    </span>
                  </div>
                </td>

              </tr>
            )
          })
          // Si no hay productos

        }
      </tbody>

    </table>
  )
}
