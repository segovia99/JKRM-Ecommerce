import TitleCard from '@/components/admin/Cards/TitleCard'
import Layout from '@/components/admin/Layout'
import { useAdmin } from '@/hooks/useAdmin'
import axios from 'axios'
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import React, { useEffect, useState, useRef } from 'react'
import SearchBar from '@/components/Input/SearchBar'
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import PencilSquareIcon from '@heroicons/react/24/outline/PencilSquareIcon'

const TopSideButtons = ({ removeFilter, applyFilter, applySearch, newProduct }) => {
  const [filterParam, setFilterParam] = useState('')
  const [searchText, setSearchText] = useState('')
  const [categorias, setCategorias] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
  const loadCategorias = async () => {
    const response = await axios.get('/api/categoriasCRUD/categorias')
    setCategorias(response.data)
    // setIsLoading(false)
  }

  useEffect(() => {
    loadCategorias()
  }, [])

  // const locationFilters = ['Herramientas', 'Hogar', 'Material de contruccion', 'Fontaneria', 'Material electrico']

  const showFiltersAndApply = (params) => {
    applyFilter(params)
    setFilterParam(params)
  }

  const removeAppliedFilter = () => {
    removeFilter()
    setFilterParam('')
    setSearchText('')
  }

  useEffect(() => {
    if (searchText === '') {
      removeAppliedFilter()
    } else {
      applySearch(searchText)
    }
  }, [searchText])

  return (
    <div className='inline-block float-right'>
      <SearchBar searchText={searchText} styleClass='mr-4' setSearchText={setSearchText} />
      {filterParam !== '' && <button onClick={() => removeAppliedFilter()} className='btn btn-xs mr-2 btn-active btn-ghost normal-case'>{filterParam}<XMarkIcon className='w-4 ml-2' /></button>}
      <div className='dropdown dropdown-bottom dropdown-end'>
        <label tabIndex={0} className='btn btn-sm btn-outline'><FunnelIcon className='w-5 mr-2' />Filtrar</label>
        <ul tabIndex={0} className='dropdown-content menu p-2 text-sm shadow bg-base-100 rounded-box w-52'>
          {
                        categorias.map((l, k) => {
                          return <li key={k}><a onClick={() => showFiltersAndApply(l.nombre)}>{l.nombre}</a></li>
                        })
                    }
          <div className='divider mt-0 mb-0' />
          <li><a onClick={() => removeAppliedFilter()}>Remover filtro</a></li>
        </ul>
      </div>
      <button className=' btn px-6 btn-sm normal-case btn-info ml-16' onClick={() => newProduct()}>
        Nuevo
      </button>
    </div>
  )
}

function Inventario () {
  const productosb = useRef([])
  const { setPageTitle, setIsOpen, setHeader, setProducto, updateFieldValue, setIsUpdate, productosG, setProductosG } = useAdmin()
  // const [productos, setProductos] = useState([])
  const loadData = async () => {
    const res = await axios.get('/api/inventory')
    setProductosG(res.data)
    productosb.current = res.data
    // console.log(res.data)
  }
  useEffect(() => {
    setPageTitle('Inventario')
    loadData()
  }, [])

  const removeFilter = () => {
    setProductosG(productosb.current)
  }

  const applyFilter = (params) => {
    const filteredTransactions = productosG.filter((t) => { return t.categoria === params })
    setProductosG(filteredTransactions)
  }

  // Search according to name
  const applySearch = (value) => {
    const filteredProducts = productosG.filter((t) => { return t.nombre.toLowerCase().includes(value.toLowerCase()) || t.nombre.toLowerCase().includes(value.toLowerCase()) })

    setProductosG(filteredProducts)
  }

  const open = () => {
    setIsOpen(true)
  }

  const updateProduct = (id) => {
    setIsUpdate(true)
    setHeader('Actualizar Producto')
    open()
    const filteredProduct = productosG.filter((t) => { return t.id === id })
    setProducto(filteredProduct[0])
    updateFieldValue('nombre', filteredProduct[0].nombre)
    updateFieldValue('descripcion', filteredProduct[0].descripcion)
    updateFieldValue('precio', filteredProduct[0].precio)
    updateFieldValue('categoria', filteredProduct[0].categoria)
    updateFieldValue('url', filteredProduct[0].url)
    updateFieldValue('marca', filteredProduct[0].marca)
    updateFieldValue('cantidad', filteredProduct[0].cantidad)
    updateFieldValue('descuento', filteredProduct[0].descuento)
  }

  const cleanFields = () => {
    updateFieldValue('nombre', '')
    updateFieldValue('descripcion', '')
    updateFieldValue('precio', '')
    updateFieldValue('categoria', '')
    updateFieldValue('url', '')
    updateFieldValue('marca', '')
    updateFieldValue('cantidad', '')
    updateFieldValue('descuento', 0)
  }
  const newProducto = () => {
    setIsUpdate(false)
    setHeader('Nuevo Producto')
    cleanFields()
    open()
  }

  return (
    <Layout>
      <>

        <TitleCard title='Productos' topMargin='mt-2' TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} newProduct={newProducto} />}>

          <div className='overflow-x-auto w-full'>
            <table className='table w-full'>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Stock</th>
                  <th>Descuento</th>
                  <th>Categoria</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {
                  productosG.map((product, k) => {
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
                              <div className='font-bold'>{product.nombre}</div>
                            </div>
                          </div>
                        </td>
                        <td>${product.precio}</td>
                        <td>{product.cantidad}</td>
                        <td>{product.descuento}%</td>
                        <td>{product.categoria}</td>
                        <td><button className='btn btn-square btn-ghost'><TrashIcon className='w-5' /></button></td>
                        <td><button className='btn btn-square btn-ghost' onClick={() => updateProduct(product.id)}><PencilSquareIcon className='w-5' /></button></td>
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

export default Inventario
