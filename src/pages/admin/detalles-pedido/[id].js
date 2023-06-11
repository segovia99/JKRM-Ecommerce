import TitleCard from '@/components/admin/Cards/TitleCard'
import Layout from '@/components/admin/Layout'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function DetallesPedido () {
  const [products, setProducts] = useState([])

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (!id) return
    fetch(`/api/pedido?id=${id}`)
      .then((res) => res.json())
      .then(setProducts)
  }, [id])

  return (
    <Layout>
      <>

        <TitleCard title='Detalles del pedido' topMargin='mt-2'>

          {products.length > 0
            ? (
              <div className='flex w-[70%] px-10 py-[30px] '>
                <div className='mx-auto'>
                  <h2 className='text-qblack font-medium mb-2'>Cliente</h2>
                  <p>{products[0].nombre} {products[0].apellido}</p>
                </div>
                <div className='mx-auto'>
                  <h2 className='text-qblack font-medium mb-2'>Dirección de Envío</h2>
                  <p>{products[0].direccion}</p>
                </div>
                <div className='mx-auto'>
                  <h2 className='text-qblack font-medium mb-2'>Correo Electrónico</h2>
                  <p>{products[0].email}</p>
                </div>
              </div>
              )
            : (
              <p>Cargando....</p>
              )}

          {/* Leads List in table format loaded from slice after api call */}
          <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>SubTotal</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {
                    products.map((product, k) => {
                      return (
                        <tr key={k}>
                          <td>
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
                          <td>${product.precio}</td>
                          <td>{product.cantidad}</td>
                          <td>${product.total}</td>

                        </tr>
                      )
                    })
                }
              </tbody>
            </table>
          </div>
        </TitleCard>
      </>
    </Layout>
  )
}
