import TitleCard from '@/components/admin/Cards/TitleCard'
import Layout from '@/components/admin/Layout'
import UserModal from '@/components/admin/UserModal'
import { useAdmin } from '@/hooks/useAdmin'
import { jwtVerify } from 'jose'
import { useEffect, useState } from 'react'

function Usuarios () {
  const [usuarios, setUsuarios] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const { setPageTitle } = useAdmin()
  useEffect(() => {
    setPageTitle('Usuarios')
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data)
      })
  }, [])

  const openModal = () => {
    setIsOpen(true)
  }
  const TopSideButtons = () => {
    return (
      <button className=' btn px-6 btn-sm normal-case btn-info' onClick={() => openModal()}>
        Nuevo
      </button>
    )
  }

  const role = (rol) => {
    if (rol === 1) return <div className='badge badge-primary'>administrador</div>
    else if (rol === 3) return <div className='badge badge-info'>Logistica</div>
    else if (rol === 4) return <div className='badge badge-success'>Inventarios</div>
  }

  return (
    <Layout>
      <>

        <TitleCard title='Usuarios' topMargin='mt-2' TopSideButtons={<TopSideButtons />}>

          {/* Leads List in table format loaded from slice after api call */}
          <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map((user, k) => {
                    return (
                      <tr key={k}>
                        <td>
                          <div className='flex items-center space-x-3'>
                            <div>
                              <div className='font-bold'>{user.nombre}</div>
                              <div className='text-sm opacity-50'>{user.apellido}</div>
                            </div>
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td>{role(user.rol)}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </TitleCard>
        <UserModal setUsuarios={setUsuarios} isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    </Layout>
  )
}

export default Usuarios

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
