import FilterCatalago from '@/components/FilterCatalago'
import ProductCardOne from '@/components/ProductCardOne'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useCart } from '@/hooks/useCart'
import AOS from 'aos'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Catalogo () {
  const [products, setProducts] = useState([])
  const { addToCart } = useCart()
  const loadData = async () => {
    const response = await axios.get('/api/products')
    // console.log(response.data)
    setProducts(response.data)
  }
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
                  {
                products.map((product) => {
                  const { description, price, img, title, id } = product
                  return (
                    <ProductCardOne
                      key={id} title={title} description={description} price={price} img={img} id={id} addToCart={
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
