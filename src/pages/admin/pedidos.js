import TitleCard from '@/components/admin/Cards/TitleCard'
import Layout from '@/components/admin/Layout'
import { useAdmin } from '@/hooks/useAdmin'
import { useEffect, useState } from 'react'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import Link from 'next/link'
import moment from 'moment'
import { jwtVerify } from 'jose'

function Pedidos () {
  const { setPageTitle } = useAdmin()
  const [pedidos, setPedidos] = useState([])
  useEffect(() => {
    setPageTitle('Pedidos')
    fetch('/api/pedidos')
      .then(res => res.json())
      .then(data => {
        setPedidos(data)
      })
  }, [])

  const getStatus = (index) => {
    if (index === '1') return <div className='badge badge-primary'>Pendiente</div>
    else if (index === '2') return <div className='badge badge-info'>Enviado</div>
    else if (index === '3') return <div className='badge badge-success'>Entregado</div>
  }
  return (
    <Layout>
      <>

        <TitleCard title='Pedidos Recientes' topMargin='mt-2'>

          {/* Leads List in table format loaded from slice after api call */}
          <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th />
                </tr>
              </thead>
              <tbody>

                {
                            pedidos.map((pedido, k) => {
                              return (
                                <tr key={k}>
                                  <td>
                                    <div className='flex items-center space-x-3'>
                                      <div>
                                        <div className='font-bold'>{pedido.nombre}</div>
                                        <div className='text-sm opacity-50'>{pedido.apellido}</div>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{pedido.email}</td>
                                  <td>{moment(pedido.fecha_pedido).add(0, 'days').format('DD MMM YY')}</td>
                                  <td>{getStatus(pedido.estado_pedido)}</td>
                                  <td><Link href={`/admin/detalles-pedido/${pedido.id_pedido}`} className='btn btn-square btn-ghost'><EyeIcon className='w-5' /></Link></td>
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

export default Pedidos

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
      if (rol !== 1) {
        if (rol === 3) {
          context.res.writeHead(302, { Location: context.req.headers.referer || '/Logistics/pedidos' })
        } else if (rol === 4) {
          context.res.writeHead(302, { Location: context.req.headers.referer || '/inventory' })
        } else {
          context.res.writeHead(302, { Location: context.req.headers.referer || '/' })
        }
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
