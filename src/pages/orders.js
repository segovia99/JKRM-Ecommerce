import TitleCard from '@/components/admin/Cards/TitleCard'
import LandingLayout from '@/components/layouts/LandingLayout'
import axios from 'axios'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Orders () {
  const [orders, setOrders] = useState([])
  const { data: session } = useSession()

  const getOrders = async () => {
    const response = await axios.get(`/api/orders?id=${session.user.id}`)
    setOrders(response.data)
  }

  const getStatus = (index) => {
    if (index === '1') return <span className='text-sm rounded text-red-500 bg-red-100 p-2'>Pendiente</span>
    else if (index === '2') return <span className='text-sm rounded text-blue-500 bg-blue-100 p-2'>Enviado</span>
    else if (index === '3') return <span className='text-sm rounded text-green-500 bg-green-100 p-2'>Entregado</span>
  }

  useEffect(() => {
    if (session) getOrders()
  }, [session])
  return (
    <LandingLayout>
      <div className='w-full pt-0 pb-0 bg-[#f8f8f8]'>
        <div className='container-x mx-auto pt-5'>
          <TitleCard title='Mis pedidos' topMargin='pt-10'>
            <div className='flex-1'>
              <div className='item-body dashboard-wrapper w-full'>
                <div className='relative w-full overflow-x-auto sm:rounded-lg'>
                  <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                    <thead>
                      <tr className='text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom '>
                        <th className='py-4 whitespace-nowrap text-center'>Fecha</th>
                        <th className='py-4 whitespace-nowrap text-center'>Estado</th>
                        <th className='py-4 whitespace-nowrap text-center'>Monto</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {
                        orders.map((order) => {
                          return (
                            <tr key={order.id} className='bg-white border-b hover:bg-gray-50'>

                              <td className='text-center py-4 px-2'>
                                <span className='text-base text-qgray  whitespace-nowrap'>
                                  {moment(order.fecha_pedido).add(0, 'days').format('DD MMM YY')}
                                </span>
                              </td>
                              <td className='text-center py-4 px-2'>
                                {getStatus(order.estado_pedido)}
                              </td>
                              <td className='text-center py-4 '>
                                <span className='text-base text-qblack whitespace-nowrap '>
                                  ${order.total}
                                </span>
                              </td>
                              <td className='text-center py-4 px-2'>
                                <Link href={`/myorder/${order.id}`} className='btn btn-square border-none w-[116px] h-[46px] bg-primary text-white font-bold'>Detalles</Link>
                              </td>
                            </tr>
                          )
                        })
                        }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TitleCard>
        </div>
      </div>
    </LandingLayout>
  )
}
