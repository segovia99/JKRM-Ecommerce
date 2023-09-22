import { useEffect, useState } from 'react'
import Layout from '@/components/admin/Layout'
import axios from 'axios'
import { useAdmin } from '@/hooks/useAdmin'
import { jwtVerify } from 'jose'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'

function queryAttr (element, attribute, query) {
  return document.querySelector(`${element}[${attribute}="${query}"]`)
}

export default function Categorias () {
  let idCategorias = 1
  const [categories, setCategories] = useState([])
  const { setPageTitle } = useAdmin()
  useEffect(() => {
    setPageTitle('Categorias')
  }, [])

  useEffect(() => {
    (async () => {
      const resCategories = await axios.get('/api/categoriasCRUD/categorias')
      setCategories(resCategories.data)
    })()
  }, [])

  const deleteCategory = async (id) => {
    await axios.delete('/api/categoriasCRUD/categorias', { data: { id } })
    setCategories(categories.filter(category => category.id !== id)) // selecciona todas las que cumplen la condicion
  }

  const modifyCategory = (item) => {
    queryAttr('input', 'name', 'idCategoria').value = item.id
    queryAttr('input', 'name', 'nombreCategoria').value = item.nombre
  }

  const insertCategory = async (nombre) => {
    const resCategories = await axios.post('/api/categoriasCRUD/categorias', { nombre })
    setCategories(resCategories.data)
    queryAttr('input', 'name', 'nombreCategoria').value = ''
  }

  const updateCategory = async (id, nombre) => {
    const resCategories = await axios.put('/api/categoriasCRUD/categorias', { id, nombre })
    setCategories(resCategories.data)
    queryAttr('input', 'name', 'nombreCategoria').value = ''
  }

  return (
    <Layout selection='categorias'>
      <div className='w-[100%] h-[85vh] mt-2 bg-base-100 shadow-xl card p-6'>
        <div className='text-xl font-semibold'>Categorias</div>
        <div className='divider mt-2' />
        <div className='w-[100%] h-[68%] overflow-y-auto border-gray-200 w-full'>
          <table className='w-full table'>
            <thead className='sticky top-0 w-full'>
              <tr className='h-8'>
                <th>id</th>
                <th>categoria</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {
                  categories.map(item => {
                    idCategorias++

                    if (idCategorias % 2 === 0) {
                      return (
                        <tr key={item.id} className='h-8 bg-[#f2f2f2]'>
                          <td className='font-bold'>{item.id}</td>
                          <td className='font-bold'>{item.nombre}</td>
                          <td><button onClick={() => deleteCategory(item.id)} className='btn btn-square btn-ghost'><TrashIcon className='w-5' /></button></td>
                          <td><button onClick={() => modifyCategory(item)} className='btn btn-square btn-ghost'><PencilSquareIcon className='w-5' /></button></td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={item.id} className='h-8'>
                          <td className='font-bold'>{item.id}</td>
                          <td className='font-bold'>{item.nombre}</td>
                          <td><button onClick={() => deleteCategory(item.id)} className='btn btn-square btn-ghost'><TrashIcon className='w-5' /></button></td>
                          <td><button onClick={() => modifyCategory(item)} className='btn btn-square btn-ghost'><PencilSquareIcon className='w-5' /></button></td>
                        </tr>
                      )
                    }
                  })
                }
            </tbody>
          </table>
        </div>
        <div className='divider mt-2' />
        <div className='card shadow-xl w-[100%] h-[20%] bg-base-100 flex flex-col justify-center space-y-[16px]'>
          <div>
            <button
              onClick={() => insertCategory(
                queryAttr('input', 'name', 'nombreCategoria').value
              )} className='btn px-6 btn-sm normal-case btn-info ml-16'
            >Insertar
            </button>
            <button onClick={() => updateCategory(document.querySelector('input[name="idCategoria"]').value, document.querySelector('input[name="nombreCategoria"]').value)} className='btn px-6 btn-sm normal-case btn-info ml-16'>Guardar</button>
          </div>
          <div id='categorias' className='flex flex-row space-x-[10px] wrap pb-6'>
            <input name='idCategoria' className='font-bold ml-16 input input-sm input-bordered  w-full max-w-xs' type='text' disabled placeholder='Id (No necesario)' />
            <input name='nombreCategoria' className='font-bold ml-16 input input-sm input-bordered  w-full max-w-xs' type='text' placeholder='Nombre categoria' />
          </div>
        </div>
      </div>
    </Layout>
  )
}

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
