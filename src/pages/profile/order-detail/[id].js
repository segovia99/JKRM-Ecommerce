import Layout from '@/components/customerinfo/Layout'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function OrderDetail () {
  const [products, setProducts] = useState([])

  const router = useRouter()
  const { id } = router.query
  let total = 0

  const goTo = (id) => router.push(`/profile/return?id=${id}`)

  const orderState = (estado) => {
    if (estado === '1') return 'Tu pedido esta pendiente de envio'
    if (estado === '2') return 'Tu pedido ha sido enviado'
    if (estado === '3') return 'Tu pedido fue entregado'
  }

  useEffect(() => {
    if (!id) return
    fetch(`/api/pedido?id=${id}`)
      .then((res) => res.json())
      .then(setProducts)
  }, [id])
  return (
    <LandingLayout>
      <Layout>
        <div className='flex-1'>
          <div className='item-body dashboard-wrapper w-full'>
            <div className='flex-1'>
              <div className='w-full'>
                {
                    products.length > 0 && (
                      <>
                        <h1 className='text-xl tracking-wide font-bold text-qblack flex items-center mb-2'>
                          {orderState(products[0].estado_pedido)}
                        </h1>
                      </>
                    )
                }
              </div>
            </div>
            <div className='inline-block float-right'>
              <button type='button' onClick={() => goTo(id)} className='w-[116px] h-[46px] bg-primary text-white font-bold mb-4'>
                Devolucion
              </button>
            </div>
            <div className='relative w-full overflow-x-auto border border-[#EDEDED]'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <tr className='text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase '>
                  <td className='py-4 whitespace-nowrap text-center'>
                    Producto
                  </td>
                  <td className='py-4 whitespace-nowrap text-center border-l border-[#EDEDED]'>
                    precio
                  </td>
                  <td className='py-4 whitespace-nowrap text-center border-l border-[#EDEDED]'>
                    Cantidad
                  </td>
                  <td className='py-4 whitespace-nowrap text-center border-l border-[#EDEDED]'>
                    SubTotal
                  </td>
                </tr>
                {
                    products.map((product, k) => {
                      total += parseFloat(product.total)
                      return (
                        <tr key={k} className='bg-white border-b hover:bg-gray-50'>
                          <td className='pl-10  py-4 '>
                            <div className='flex space-x-6 items-center'>
                              <div className='w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]'>
                                <div className='w-full h-full object-contain'>
                                  <img src={product.url} alt='Avatar' />
                                </div>
                              </div>
                              <div className='flex-1 flex flex-col'>
                                <p className='font-medium text-[15px] text-qblack'>{product.nombre_producto}</p>

                              </div>
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>${product.precio}</td>
                          <td className='text-center py-4 px-2'>{product.cantidad}</td>
                          <td className='text-center py-4 px-2'>${product.total}</td>

                        </tr>
                      )
                    })
                }
                <tfoot>
                  <tr>
                    <td colspan='3' align='right' className='text-[15px] font-semibold text-qblack'>Total:</td>
                    <td className='text-[15px] font-semibold text-qblack px-2'>${total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default OrderDetail
