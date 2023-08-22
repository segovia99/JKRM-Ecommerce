import CardSkeletoProduct from '@/components/CardSkeletoProduct'
import FilterCatalago from '@/components/FilterCatalago'
import ProductCardOne from '@/components/ProductCardOne'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useCart } from '@/hooks/useCart'
import { useUserStore } from '@/store/loginStore'
import AOS from 'aos'
import axios from 'axios'
import { jwtVerify } from 'jose'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Catalogo ({ IsLogin, User }) {
  const { setIsLogin, setUser } = useUserStore()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  const loadData = async () => {
    const response = await axios.get('/api/products')
    // console.log(response.data)
    setProducts(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLogin(IsLogin)
    setUser(User)
  }, [])

  useEffect(() => {
    loadData()
    AOS.init()
  }, [])
  return (
    <LandingLayout>
      <div className='w-full  pt-[30px] pb-[60px]'>
        <div className='products-page-wrapper w-full'>
          <div className='container-x mx-auto'>
            <div className='w-full lg:flex lg:space-x-[30px]'>
              <FilterCatalago />
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
                products.map((product) => {
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
