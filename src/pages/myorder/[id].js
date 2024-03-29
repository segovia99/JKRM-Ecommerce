import TitleCard from '@/components/admin/Cards/TitleCard'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function MyOrder () {
  const [products, setProducts] = useState([])
  const { data: session } = useSession()
  const router = useRouter()
  const { id } = router.query
  let total = 0

  useEffect(() => {
    if (!id) return
    if (session) {
      fetch(`/api/pedido?id=${id}`)
        .then((res) => res.json())
        .then(setProducts)
    }
  }, [id, session])

  return (
    <LandingLayout>
      <>
        <div className='w-full pt-0 pb-0 bg-[#f8f8f8]'>
          <div className='container-x mx-auto pt-5'>
            <TitleCard title='Detalles del pedido' topMargin='pt-2'>

              <div className='overflow-x-auto w-full'>
                <table className='table w-full'>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className='py-4 whitespace-nowrap text-center'>Precio</th>
                      <th className='py-4 whitespace-nowrap text-center'>Cantidad</th>
                      <th className='py-4 whitespace-nowrap text-center'>SubTotal</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {
                    products.map((product, k) => {
                      total += parseFloat(product.total)
                      return (
                        <tr key={k}>
                          <td className='text-center py-4 px-2'>
                            <div className='flex items-center space-x-3'>
                              <div className='avatar'>
                                <div className='mask mask-squircle w-12 h-12'>
                                  <img src={product.url} alt='Avatar' />
                                </div>
                              </div>
                              <div>
                                <div className='font-bold'>{product.nombre_producto}</div>

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
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan='3' align='right' className='text-[15px] font-semibold text-qblack'>Total:</td>
                      <td className='text-[15px] font-semibold text-qblack px-2'>${total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </TitleCard>
          </div>
        </div>
      </>
    </LandingLayout>
  )
}
