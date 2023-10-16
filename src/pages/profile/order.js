import Layout from '@/components/customerinfo/Layout'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useUserStore } from '@/store/loginStore'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment'
import { jwtVerify } from 'jose'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Order = ({ IsLogin, User }) => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const { setIsLogin, setUser } = useUserStore()
  const [isloading, setIsloading] = useState(true)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Calcula el índice de inicio y final para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Filtra los elementos para mostrar solo los de la página actual
  const currentOrders = orders.slice(startIndex, endIndex)

  // Funciones para cambiar de página
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToNextPage = () => {
    const totalPages = Math.ceil(orders.length / itemsPerPage)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const pages = []

  for (let i = 0; i < Math.ceil(orders.length / itemsPerPage); i++) {
    pages.push(i)
  }

  const getOrders = async () => {
    const response = await axios.get(`/api/orders?id=${User.id}`)
    setOrders(response.data)
    setIsloading(false)
  }

  const getStatus = (index) => {
    if (index === '1') return <span className='text-sm rounded text-red-500 bg-red-100 p-2'>Pendiente</span>
    else if (index === '2') return <span className='text-sm rounded text-blue-500 bg-blue-100 p-2'>Enviado</span>
    else if (index === '3') return <span className='text-sm rounded text-green-500 bg-green-100 p-2'>Entregado</span>
  }

  useEffect(() => {
    setIsLogin(IsLogin)
    setUser(User)
  }, [])

  useEffect(() => {
    getOrders()
  }, [])

  const goTo = (id) => router.push(`/profile/order-detail/${id}`)

  return (
    <LandingLayout>
      <Layout>
        <div className='flex-1'>
          <div className='item-body dashboard-wrapper w-full'>
            <div className='relative w-full overflow-x-auto sm:rounded-lg'>
              <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <tr className='text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom '>
                  <td className='py-4 whitespace-nowrap text-center'>
                    Fecha
                  </td>
                  <td className='py-4 whitespace-nowrap text-center'>
                    Estado
                  </td>
                  <td className='py-4 whitespace-nowrap text-center'>
                    Monto
                  </td>
                  <td className='py-4 whitespace-nowrap text-center' />
                </tr>
                {
                    isloading &&
                      <>
                        <tr className='bg-white border-b hover:bg-gray-50'>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>

                        </tr>
                        <tr className='bg-white border-b hover:bg-gray-50'>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>

                        </tr>
                        <tr className='bg-white border-b hover:bg-gray-50'>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>

                        </tr>
                        <tr className='bg-white border-b hover:bg-gray-50'>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>

                        </tr>
                        <tr className='bg-white border-b hover:bg-gray-50'>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>
                          <td className='text-center py-4 px-2'>
                            <div className='w-[116px] h-[46px] whitespace-nowrap'>
                              <Skeleton count={1} className='w-full h-full' />
                            </div>
                          </td>

                        </tr>
                      </>
                }

                {
                    currentOrders.map((order) => {
                      return (
                        <tr className='bg-white border-b hover:bg-gray-50' key={order.id}>
                          <td className='text-center py-4 px-2'>
                            <span className='text-base text-qgray  whitespace-nowrap'>
                              {moment(order.fecha_pedido).add(0, 'days').format('DD MMM YY')}
                            </span>
                          </td>
                          <td className='text-center py-4 px-2'>
                            {getStatus(order.estado_pedido)}
                          </td>
                          <td className='text-center py-4 px-2'>
                            <span className='text-base text-qblack whitespace-nowrap px-2 '>
                              ${order.total}
                            </span>
                          </td>
                          <td className='text-center py-4'>
                            <button type='button' onClick={() => goTo(order.id)} className='w-[116px] h-[46px] bg-primary text-white font-bold'>
                              Ver Detalles
                            </button>
                          </td>
                        </tr>
                      )
                    })
                }

                <tr className='text-base text-qgray whitespace-nowrap px-2  '>
                  <div className='flex flex-row justify-center'>
                    <button
                      className='bg-[#000000] p-[10px] text-[#ffffff] w-[100px] rounded-l-md hover:bg-[#3b3b3b]'
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >Anterior
                    </button>
                    {pages.map((item, index) => {
                      const pageNumber = item + 1
                      const isActive = pageNumber === currentPage
                      return (
                        <button
                          className={`${
                                      isActive ? 'bg-[#e6e6e6]' : 'bg-[#f0f0f0]'
                                    } w-[60px] hover:bg-[#f0f0f0]`}
                          key={index}
                          onClick={() => {
                            setCurrentPage(pageNumber)
                            window.scrollTo(0, 0)
                          }}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}
                    <button
                      className='bg-[#000000] p-[10px] text-[#ffffff] w-[100px] rounded-r-md hover:bg-[#3b3b3b]'
                      onClick={goToNextPage}
                      disabled={currentPage === Math.ceil(orders.length / itemsPerPage)}
                    >Siguiente
                    </button>
                  </div>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default Order

export async function getServerSideProps (context) {
  const { token } = context.req.cookies
  let IsLogin = false
  let User = null
  if (token) {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode('jkrm')
    )
    if (payload) {
      IsLogin = true
      const { id, nombre, apellido, email, direccion, rol } = payload
      User = { id, nombre, apellido, email, direccion }
      if (rol === 1) {
        context.res.writeHead(302, {
          Location: '/admin/dashboardsales' // URL de la página a la que se redireccionará
        })
        context.res.end()
      }
    }
  }

  // console.log(IsLogin)
  return {
    props: {
      IsLogin,
      User
    }
  }
}
