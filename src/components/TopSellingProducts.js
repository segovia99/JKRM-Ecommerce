import Link from 'next/link'
import { ArrowRIcon } from './Icons'
import ProductCardTwo from './ProductCardTwo'
import { useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function TopSellingProducts () {
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
    <section className='section-wrapper w-full top-selling-product mb-[60px]'>
      <div className='container-x mx-auto'>
        <div className=' section-title flex justify-between items-center mb-5'>
          <div>
            <h1 className='sm:text-3xl text-xl font-600 text-qblacktext leading-none'>Los productos más vendidos</h1>
          </div>
          <div>
            <Link href='/'>
              <div className='flex space-x-2 items-center'>
                <p className='text-base font-600 text-qblack'>Ver mas</p>
                <span className='animate-right-dir'>
                  <ArrowRIcon />
                </span>
              </div>
            </Link>
          </div>
        </div>
        <div className='section-content'>
          <div className='section-content w-full grid sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 '>
            {
                products.slice(0, 4).map((product) => {
                  const { precio, url, nombre, id } = product
                  return (
                    <ProductCardTwo
                      key={id} title={nombre} price={precio} img={url} id={id} addToCart={
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
    </section>
  )
}
