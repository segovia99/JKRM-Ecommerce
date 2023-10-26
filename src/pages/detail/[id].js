import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LandingLayout from '@/components/layouts/LandingLayout'
import AOS from 'aos'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'
import ReviewCard from '@/components/ReviewCard'
import ReviewForm from '@/components/ReviewForm'
import axios from 'axios'
import Lottie from 'lottie-react'
import heart from 'heart.json'
import { useWishlistStore } from '@/store/wishlistStore'
import { useSession } from 'next-auth/react'

export default function Detail () {
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [isAdded, setIsAdded] = useState(false)
  const [reviews, setReviews] = useState([])
  const router = useRouter()
  const { id } = router.query
  const { setItems, items } = useWishlistStore()
  const { data: session } = useSession()

  useEffect(() => {
    AOS.init()
    if (!id) return
    fetch(`/api/search?id=${id}`)
      .then((res) => res.json())
      .then(setProduct)
    fetch(`/api/review?id=${id}`)
      .then((res) => res.json())
      .then(setReviews)
  }, [id])

  const checkIsAdded = async () => {
    const values = {
      idUsuario: session.user.id,
      idProducto: id
    }
    const response = await axios.post('/api/wishlist-v2', values)
    const { registros } = response.data[0]
    if (registros > 0) {
      setIsAdded(true)
    }
  }

  useEffect(() => {
    if (session) checkIsAdded()
  }, [session])

  if (!product) return

  const addToWishlist = async () => {
    const values = {
      idUsuario: session.user.id,
      idProducto: id
    }
    if (!isAdded) {
      toast.success('Agregado a la lista de deseos', { autoClose: 1000 })
      setIsAdded(true)
      setItems(items + 1)
      await axios.post('/api/wishlist', values)
    } else {
      toast.success('Se aquitado de la lista de deseos', { autoClose: 1000 })
      setIsAdded(false)
      setItems(items - 1)
      await axios.delete('/api/wishlist', {
        params: values
      })
    }
  }

  return (
    <LandingLayout>
      <div className='w-full  pt-0 pb-0'>
        <div className='single-product-wrapper w-full '>
          <div className='product-view-main-wrapper bg-white pt-[30px] w-full'>
            <div className='w-full bg-white pb-[60px]'>
              <div className='container-x mx-auto'>
                <div className='product-view w-full lg:flex justify-between '>
                  <div className='lg:w-1/2 xl:mr-[70px] lg:mr-[50px] aos-init aos-animate'>
                    <div className='w-full'>
                      <div className='w-full h-[600px] border border-qgray-border flex justify-center items-center overflow-hidden relative mb-3'>
                        <img src={`${product[0].url}`} alt={product[0].nombre} />
                      </div>
                      <div className='flex gap-2 flex-wrap'>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${product[0].url}`} className='w-full h-full object-contain  ' alt={product[0].nombre} />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${product[0].url}`} className='w-full h-full object-contain  opacity-50' alt={product[0].nombre} />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${product[0].url}`} className='w-full h-full object-contain  opacity-50' alt={product[0].nombre} />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${product[0].url}`} className='w-full h-full object-contain  opacity-50' alt={product[0].nombre} />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${product[0].url}`} className='w-full h-full object-contain opacity-50' alt={product[0].nombre} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <div className='product-details w-full mt-10 lg:mt-0'>
                      <p data-aos className='text-xl font-medium text-black mb-4 aos-init aos-animate'>{product[0].nombre}</p>
                      <div data-aos='fade-up' className='flex space-x-2 items-center mb-7 aos-init aos-animate'>
                        {
                        parseFloat(product[0].precio) !== parseFloat(product[0].descuento)
                          ? (
                            <>
                              <span className='text-sm font-500 text-qgray line-through mt-2'>${product[0].precio}</span>
                              <span className='text-2xl font-500 text-red-600'>${parseFloat(product[0].descuento).toFixed(2)}</span>
                            </>
                            )
                          : (
                            <span className='text-2xl font-500 text-red-600'>${product[0].precio}</span>
                            )
                        }

                      </div>
                      <p data-aos='fade-up' className='text-gray-500 text-sm text-normal mb-[30px] leading-7 aos-init aos-animate'>{product[0].descripcion}</p>
                      <div data-aos='fade-up' className='quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px] aos-init aos-animate'>
                        <div className='w-[120px] h-full px-[26px] flex items-center border border-qgray-border'>
                          <div className='flex justify-between items-center w-full'>
                            <button type='button' className='text-base text-qgray'>-</button>
                            <span className='text-qblack'>1</span>
                            <button type='button' className='text-base text-qgray'>+</button>
                          </div>
                        </div>
                        {
                          session && (
                            <div className='w-[60px] h-full flex justify-center items-center border border-qgray-border'>
                              <button type='button' onClick={() => addToWishlist()}>
                                {
                              isAdded
                                ? (
                                  <span className='w-[24px] h-[24px]'>
                                    <Lottie animationData={heart} loop={false} />
                                  </span>
                                  )
                                : (
                                  <span><svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z' stroke='#D5D5D5' strokeWidth='2' strokeMiterlimit='10' strokeLinecap='square' /></svg>
                                  </span>
                                  )
                            }
                              </button>
                            </div>
                          )
                        }
                        <div className='flex-1 h-full'>
                          <button
                            type='button' className='black-btn text-sm font-semibold w-full h-full' onClick={
                            () => {
                              addToCart(product[0])
                              toast.success('se agrego al carrito', { autoClose: 1000 })
                            }
                          }
                          >Agregar al Carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='product-des-wrapper w-full relative pb-[60px] mt-4'>
            <div className=' w-full min-h-[400px] '>
              <div className='container-x mx-auto'>
                <div className='w-full tab-content-item aos-init aos-animate'>
                  <h6 className='text-[18px] font-medium text-qblack mb-2'>Reseñas</h6>
                  <div className='w-full'>
                    <div className='review-wrapper w-full'>
                      <div className='w-full reviews mb-[60px]'>
                        <div className='w-full comments mb-[60px]'>
                          {
                            reviews.map((review) => (
                              <ReviewCard key={review.id} review={review} />
                            ))
                          }
                        </div>
                      </div>
                      <ReviewForm productId={id} reviews={reviews} setReviews={setReviews} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  )
}
