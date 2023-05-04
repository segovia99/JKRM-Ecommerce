import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LandingLayout from '@/components/layouts/LandingLayout'
import AOS from 'aos'
import '../../../node_modules/aos/dist/aos.css'
import axios from 'axios'

export default function Detail () {
  const [product, setProduct] = useState(null)
  const router = useRouter()
  const { id } = router.query
  const loadData = async () => {
    const { data } = await axios.get(`/api/search?id=${id}`)
    setProduct(data)
    console.log(data)
  }
  useEffect(() => {
    AOS.init()
    if (!id) return
    loadData()
  }, [id])

  if (!product) return

  const { precio, descripcion, url, nombre } = product

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
                        <img src={`${url}`} />
                      </div>
                      <div className='flex gap-2 flex-wrap'>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${url}`} className='w-full h-full object-contain  ' />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${url}`} className='w-full h-full object-contain  opacity-50' />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${url}`} className='w-full h-full object-contain  opacity-50' />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${url}`} className='w-full h-full object-contain  opacity-50' />
                        </div>
                        <div className='w-[110px] h-[110px] p-[15px] border border-qgray-border cursor-pointer'>
                          <img src={`${url}`} className='w-full h-full object-contain opacity-50' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex-1'>
                    <div className='product-details w-full mt-10 lg:mt-0'>
                      <span data-aos='fade-up' className='text-gray-400 text-xs font-normal uppercase tracking-wider mb-2 inline-block aos-init aos-animate'>Nombre categoria</span>
                      <p data-aos className='text-xl font-medium text-black mb-4 aos-init aos-animate'>{nombre}</p>
                      <div data-aos='fade-up' className='flex space-x-2 items-center mb-7 aos-init aos-animate'><span className='text-2xl font-500 text-red-600'>${precio}</span></div>
                      <p data-aos='fade-up' className='text-gray-500 text-sm text-normal mb-[30px] leading-7 aos-init aos-animate'>{descripcion}</p>
                      <div data-aos='fade-up' className='quantity-card-wrapper w-full flex items-center h-[50px] space-x-[10px] mb-[30px] aos-init aos-animate'>
                        <div className='w-[120px] h-full px-[26px] flex items-center border border-qgray-border'>
                          <div className='flex justify-between items-center w-full'>
                            <button type='button' className='text-base text-qgray'>-</button>
                            <span className='text-qblack'>1</span>
                            <button type='button' className='text-base text-qgray'>+</button>
                          </div>
                        </div>
                        <div className='w-[60px] h-full flex justify-center items-center border border-qgray-border'>
                          <button type='button'><span><svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M17 1C14.9 1 13.1 2.1 12 3.7C10.9 2.1 9.1 1 7 1C3.7 1 1 3.7 1 7C1 13 12 22 12 22C12 22 23 13 23 7C23 3.7 20.3 1 17 1Z' stroke='#D5D5D5' strokeWidth='2' strokeMiterlimit='10' strokeLinecap='square' /></svg></span>
                          </button>
                        </div>
                        <div className='flex-1 h-full'>
                          <button type='button' className='black-btn text-sm font-semibold w-full h-full'>Agregar al Carrito</button>
                        </div>
                      </div>
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
