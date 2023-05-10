import { useEffect, useState } from 'react'
import Layout from '@/components/admin/Layout'
import axios from 'axios'

function queryAttr (element, attribute, query) {
  return document.querySelector(`${element}[${attribute}="${query}"]`)
}

export default function Categorias () {
  let idCategorias = 1
  const [categories, setCategories] = useState([])

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
      <div className='w-[100%] h-[85vh] mt-[56px]'>
        <div className='w-[100%] h-[68%] overflow-y-scroll my-[10px] border-b border-gray-200'>
          <table className='w-[100%] bg-white'>
            <thead className='sticky top-0 bg-[#db1436] text-white'>
              <tr className='h-8'>
                <th>id</th>
                <th>categoria</th>
                <th>op. 1</th>
                <th>op. 2</th>
              </tr>
            </thead>
            <tbody>
              {
                  categories.map(item => {
                    idCategorias++

                    if (idCategorias % 2 === 0) {
                      return (
                        <tr key={item.id} className='h-8 bg-[#f2f2f2]'>
                          <td>{item.id}</td>
                          <td>{item.nombre}</td>
                          <td><button onClick={() => deleteCategory(item.id)} className='hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]'>borrar</button></td>
                          <td><button onClick={() => modifyCategory(item)} className='hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]'>modificar</button></td>
                        </tr>
                      )
                    } else {
                      return (
                        <tr key={item.id} className='h-8'>
                          <td>{item.id}</td>
                          <td>{item.nombre}</td>
                          <td><button onClick={() => deleteCategory(item.id)} className='hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]'>borrar</button></td>
                          <td><button onClick={() => modifyCategory(item)} className='hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]'>modificar</button></td>
                        </tr>
                      )
                    }
                  })
                }
            </tbody>
          </table>
        </div>
        <div className='w-[100%] h-[20%] bg-white border-b border-gray-200 flex flex-col justify-center space-y-[16px]'>
          <div>
            <button
              onClick={() => insertCategory(
                queryAttr('input', 'name', 'nombreCategoria').value
              )} className='hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]'
            >insertar
            </button>
            <button onClick={() => updateCategory(document.querySelector('input[name="idCategoria"]').value, document.querySelector('input[name="nombreCategoria"]').value)} className='hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]'>guardar</button>
          </div>
          <div id='categorias' className='flex flex-row space-x-[10px] wrap'>
            <div className='ml-[16px]'>
              <label className='float-left w-[100px]'>id </label>
              <input name='idCategoria' className='border border-gray-200 bg-gray-200' type='text' disabled />
            </div>
            <div>
              <label className='float-left w-[100px]'>nombre </label>
              <input name='nombreCategoria' className='border border-gray-200' type='text' />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
