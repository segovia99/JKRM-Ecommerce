import { useFilters } from '@/hooks/useFilters'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function FilterCatalago ({ setCurrentPage }) {
  const { setFilters } = useFilters()

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

  // const handleChangeMinPrice = (event) => {
  //   setFilters(prevState => ({
  //     ...prevState,
  //     minPrice: event.target.value
  //   }))
  // }

  const handleChangeCategory = (event) => {
    setCurrentPage(1)
    const selectedCategory = event.target.name
    setFilters((prevState) => {
      const updatedCategories = [...prevState.categories]
      const indexOfAll = updatedCategories.indexOf('all')

      if (selectedCategory === 'all') {
        // Si se selecciona "all," eliminarlo del array de categorías
        if (indexOfAll !== -1) {
          updatedCategories.splice(indexOfAll, 1)
        }
      } else {
        if (indexOfAll !== -1) {
          // Si "all" está en el array, quitarlo
          updatedCategories.splice(indexOfAll, 1)
        }

        if (event.target.checked) {
          // Agregar la categoría si está marcada
          updatedCategories.push(selectedCategory)
        } else {
          // Eliminar la categoría si está desmarcada
          const index = updatedCategories.indexOf(selectedCategory)
          if (index !== -1) {
            updatedCategories.splice(index, 1)
          }
        }
      }

      // Si el array de categorías está vacío, agregar "all" nuevamente
      if (updatedCategories.length === 0) {
        updatedCategories.push('all')
      }

      return {
        ...prevState,
        categories: updatedCategories
      }
    })
  }

  useEffect(() => {
    return () => {
      setFilters(prevState => ({
        ...prevState,
        categories: ['all']
      }))
    }
  }, [])

  return (
    <div className='lg:w-[270px] categorias bg-white'>
      <div className='filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] mb-[30px]  hidden lg:block'>
        <div className='filter-subject-item pb-10 border-b '>
          <div className='subject-title mb-[30px]'>
            <h1 className='text-black text-base font-500'>Categorias</h1>
          </div>
          <div className='filter-items'>
            <ul>
              {/* <li className='item flex justify-between items-center mb-5'>
                <div className='flex space-x-[14px] items-center'>
                  <div>
                    <input id='herramientas' type='checkbox' name='herramientas' />
                  </div>
                  <div>
                    <label htmlFor='herramientas' className='text-xs font-black font-400 capitalize'>Herramientas</label>
                  </div>
                </div>
              </li> */}
              {
                categorias.map((item, index) => {
                  return (
                    <li className='item flex justify-between items-center mb-5' key={index}>
                      <div className='flex space-x-[14px] items-center'>
                        <div>
                          <input id={item.id} type='checkbox' name={item.id} onChange={handleChangeCategory} />
                        </div>
                        <div>
                          <label htmlFor={item.id} className='text-xs font-black font-400 capitalize'>{item.nombre}</label>
                        </div>
                      </div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </div>

  )
}
