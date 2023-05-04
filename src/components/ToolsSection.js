import Link from 'next/link'
import { ArrowRIcon } from './Icons'
import ProductCardOne from './ProductCardOne'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'

function ToolsSection () {
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const loadData = async () => {
    const response = await axios.get('/api/products')
    // console.log(response.data)
    setProducts(response.data)
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <section data-aos='fade-up' className='section-style-one category-products mb-[60px] aos-init aos-animate'>
      <div className='section-wrapper w-full '>
        <div className='container-x mx-auto'>
          <div className=' section-title flex justify-between items-center mb-5'>
            <div>
              <h1 className='sm:text-3xl text-xl font-600 text-black leading-none'>Herramientas</h1>
            </div>
            <div>
              <Link href='/'>
                <div className='flex space-x-2 items-center'>
                  <p className='text-base font-600 text-black'>Ver Mas</p>
                  <span className='animate-right-dir'>
                    <ArrowRIcon />
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className='section-content'>
            <div className='products-section w-full'>
              <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5'>
                {
                products.slice(0, 4).map((product) => {
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
    </section>
  )
}

export default ToolsSection
