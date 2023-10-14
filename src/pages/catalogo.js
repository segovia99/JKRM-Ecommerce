import CardSkeletoProduct from '@/components/CardSkeletoProduct'
import FilterCatalago from '@/components/FilterCatalago'
import ProductCardOne from '@/components/ProductCardOne'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useCart } from '@/hooks/useCart'
import { useFilters } from '@/hooks/useFilters'
import { useUserStore } from '@/store/loginStore'
import AOS from 'aos'
import axios from 'axios'
import { jwtVerify } from 'jose'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Catalogo ({ IsLogin, User }) {
  const { filterProducts } = useFilters()
  const { setIsLogin, setUser } = useUserStore()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const filteredProducts = filterProducts(products)
  // console.log(filteredProducts)
  // const [count, setCount] = useState(0)
  // const [current, setCurrent] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const { addToCart } = useCart()

  // Calcula el índice de inicio y final para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  // Filtra los elementos para mostrar solo los de la página actual
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Funciones para cambiar de página
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo(0, 0)
    }
  }

  const goToNextPage = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
      window.scrollTo(0, 0)
    }
  }

  const loadProducts = async () => {
    const response = await axios.get('/api/products')
    setProducts(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLogin(IsLogin)
    setUser(User)
  }, [])

  useEffect(() => {
    AOS.init()
    loadProducts()
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     const response2 = await axios.get('/api/pagination')
  //     setCount(response2.data[0].count)
  //     const response = await axios.get('/api/pagination/pagination?page=' + (current * 6))
  //     setProducts(response.data)
  //     setIsLoading(false)
  //   })()
  // }, [current])

  const pages = []

  for (let i = 0; i < Math.ceil(filteredProducts.length / itemsPerPage); i++) {
    pages.push(i)
  }

  return (
    <LandingLayout>
      <div className='w-full  pt-[30px] pb-[60px]'>
        <div className='products-page-wrapper w-full'>
          <div className='container-x mx-auto'>
            <div className='w-full lg:flex lg:space-x-[30px]'>
              <FilterCatalago setCurrentPage={setCurrentPage} />
              <div className='flex-1'>
                <div className='grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]'>
                  {isLoading &&
                    <>
                      <CardSkeletoProduct />
                      <CardSkeletoProduct />
                      <CardSkeletoProduct />
                      <CardSkeletoProduct />
                      <CardSkeletoProduct />
                      <CardSkeletoProduct />
                    </>}
                  {
                currentProducts.map((product) => {
                  const { descripcion, precio, url, nombre, id } = product
                  return (
                    <ProductCardOne
                      key={id} title={nombre} description={descripcion} price={precio} img={url} id={id} addToCart={
                        () => {
                          addToCart(product)
                          toast.success('se agrego al carrito', { autoClose: 1000 })
                        }
                      }
                      {...product}
                    />
                  )
                })
               }
                </div>
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
                    disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
                  >Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
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
      User = { id, nombre, apellido, email, direccion, rol }
      if (rol === 1) {
        context.res.writeHead(302, {
          Location: '/admin/dashboard' // URL de la página a la que se redireccionará
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
