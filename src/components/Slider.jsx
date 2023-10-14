import Link from 'next/link'
import { useState, useRef } from 'react'
import Slider from 'react-slick'

export default function SliderN () {
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    afterChange: (current) => setCurrentSlide(current)
  }

  const goToPrevious = () => {
    sliderRef.current.slickPrev()
    console.log(currentSlide)
  }

  const goToNext = () => {
    sliderRef.current.slickNext()
  }

  return (

    <div className='hero-slider-wrapper xl:h-full mb-20 xl:mb-0  w-full relative'>
      <div className='absolute left-0 top-0 w-full h-full items-center justify-between hidden xl:flex'>
        <button onClick={goToPrevious} type='button' className='relative hover:text-primary text-[#e85e5e] 2xl:left-32 left-5 cursor-pointer z-10'>
          <svg className='fill-current' width='84' height='68' viewBox='0 0 84 68' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='33.5402' cy='33.5402' r='33.5402' fill='current-bolor' /><path d='M34.1823 35.8723C34.7331 35.8723 35.2127 35.8723 35.6934 35.8723C41.1617 35.8723 46.6299 35.8723 52.097 35.8723C59.5949 35.8723 67.094 35.8711 74.5919 35.8711C76.8275 35.8711 79.0631 35.8768 81.2987 35.87C82.318 35.8666 83.1014 35.4179 83.5643 34.4775C84.035 33.5224 83.9104 32.5933 83.2828 31.7665C82.7931 31.1225 82.1065 30.817 81.2931 30.8204C79.5805 30.8272 77.868 30.8238 76.1554 30.8238C70.1642 30.8238 64.174 30.8238 58.1828 30.8238C50.4701 30.8238 42.7563 30.8238 35.0436 30.8238C34.7598 30.8238 34.4772 30.8238 34.1188 30.8238C34.3581 30.5614 34.5417 30.3467 34.7387 30.1457C35.9216 28.9429 37.1122 27.747 38.2929 26.5419C39.517 25.2926 40.7299 24.0319 41.954 22.7825C43.6476 21.0528 45.3646 19.3468 47.0349 17.5921C47.6336 16.9629 47.795 16.1417 47.5557 15.2819C47.0138 13.3375 44.7482 12.7855 43.3516 14.2268C41.2829 16.3609 39.192 18.4723 37.1111 20.5939C35.5966 22.1385 34.0821 23.6843 32.5687 25.2312C30.8161 27.0224 29.0657 28.8157 27.3131 30.608C27.0159 30.9112 26.7166 31.2122 26.4184 31.5143C25.546 32.3968 25.4614 33.9335 26.2904 34.8546C27.2875 35.9608 28.3257 37.0285 29.3561 38.1018C30.3098 39.0956 31.2735 40.0791 32.2371 41.0616C33.1351 41.9781 34.041 42.8879 34.9412 43.8033C35.798 44.6745 36.6515 45.5479 37.5062 46.4201C38.5633 47.5002 39.6205 48.5815 40.6787 49.6605C41.7436 50.7474 42.8286 51.815 43.8702 52.9258C44.7993 53.9173 46.4763 53.8674 47.3198 53.0144C48.3525 51.9695 48.4126 50.4828 47.4188 49.422C46.5564 48.5009 45.6562 47.6161 44.7738 46.7143C42.5537 44.4439 40.3349 42.1712 38.1149 39.9008C36.8841 38.6424 35.65 37.3862 34.4182 36.1278C34.3548 36.0642 34.2947 35.9949 34.1823 35.8723Z' fill='#232532' /></svg>

        </button>
        <button onClick={goToNext} type='button' className='relative hover:text-primary text-[#e85e5e]  2xl:right-32 right-5 cursor-pointer z-10'>
          <svg width='84' height='68' viewBox='0 0 84 68' fill='none' xmlns='http://www.w3.org/2000/svg' className='fill-current'><circle cx='50.3094' cy='33.5402' r='33.5402' transform='rotate(180 50.3094 33.5402)' fill='' /><path d='M49.6673 31.2081C49.1165 31.2081 48.6369 31.2081 48.1562 31.2081C42.688 31.2081 37.2197 31.2081 31.7526 31.2081C24.2547 31.2081 16.7556 31.2092 9.2577 31.2092C7.02211 31.2092 4.78653 31.2035 2.55094 31.2103C1.53163 31.2138 0.748235 31.6624 0.285318 32.6028C-0.185393 33.558 -0.0607625 34.487 0.566847 35.3139C1.05647 35.9579 1.74306 36.2634 2.55651 36.26C4.26908 36.2532 5.98166 36.2566 7.69423 36.2566C13.6855 36.2566 19.6756 36.2566 25.6668 36.2566C33.3795 36.2566 41.0933 36.2566 48.806 36.2566C49.0898 36.2566 49.3724 36.2566 49.7308 36.2566C49.4915 36.5189 49.3079 36.7336 49.1109 36.9346C47.9281 38.1374 46.7374 39.3334 45.5567 40.5384C44.3327 41.7877 43.1197 43.0484 41.8957 44.2978C40.202 46.0276 38.485 47.7335 36.8147 49.4883C36.216 50.1175 36.0547 50.9386 36.2939 51.7984C36.8358 53.7428 39.1015 54.2948 40.498 52.8535C42.5667 50.7194 44.6576 48.608 46.7385 46.4864C48.253 44.9418 49.7675 43.396 51.2809 41.8491C53.0335 40.058 54.7839 38.2646 56.5366 36.4724C56.8337 36.1691 57.133 35.8681 57.4312 35.566C58.3037 34.6835 58.3882 33.1468 57.5592 32.2257C56.5621 31.1195 55.5239 30.0519 54.4935 28.9786C53.5398 27.9848 52.5762 27.0012 51.6125 26.0187C50.7145 25.1022 49.8087 24.1924 48.9084 23.277C48.0516 22.4059 47.1981 21.5325 46.3434 20.6602C45.2863 19.5801 44.2292 18.4988 43.1709 17.4198C42.106 16.3329 41.021 15.2653 39.9794 14.1545C39.0503 13.163 37.3733 13.213 36.5298 14.0659C35.4971 15.1108 35.4371 16.5975 36.4308 17.6584C37.2932 18.5795 38.1934 19.4642 39.0759 20.366C41.2959 22.6364 43.5148 24.9091 45.7348 27.1795C46.9655 28.4379 48.1996 29.6941 49.4314 30.9525C49.4949 31.0161 49.5549 31.0854 49.6673 31.2081Z' fill='#232532' /></svg>
        </button>
      </div>
      <div className='slick-slider slick-initialized'>
        <div className='slick-list'>
          <Slider ref={sliderRef} {...settings}>
            <div className='item w-full xl:h-[733px] h-[500px]'>
              <div className='imagen w-full h-full relative' style={{ backgroundImage: 'url(/baner1.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className='container-x mx-auto flex items-center  h-full'>
                  <div className='w-full h-full xl:flex items-center pt-20 xl:pt-0'>
                    <div className='xl:w-[626px] w-full'>
                      <p className='md:text-[34px] text-[20px] font-medium text-primary mb-[7px]'>Herramientas</p>
                      <h1 className='md:text-[66px] text-[40px]  font-bold text-qblack md:leading-[80px] leading-[40px] mb-[44px]'>
                        Explora Lo Mas Nuevo En Herramientas
                      </h1>
                      <Link href='/category/1'>
                        <div className='w-[160px] h-[52px] flex justify-center items-center group rounded bg-primary text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer banner-wrapper mb-[60px]'>
                          <div className='flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10'>
                            <span className='text-sm font-600 tracking-wide leading-7 mr-2'>Explorar</span>
                            <span><svg width='7' height='11' viewBox='0 0 7 11' fill='none' xmlns='http://www.w3.org/2000/svg' className='fill-current'><rect x='2.08984' y='0.636719' width='6.94219' height='1.54271' transform='rotate(45 2.08984 0.636719)' /><rect x='7' y='5.54492' width='6.94219' height='1.54271' transform='rotate(135 7 5.54492)' /></svg></span>
                          </div>
                          <div className='w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]' style={{ transition: 'transform 0.25s ease-in-out 0s' }} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className='item w-full xl:h-[733px] h-[500px]'>
              <div className='imagen w-full h-full relative' style={{ backgroundImage: 'url(/pinturas.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className='container-x mx-auto flex items-center  h-full'>
                  <div className='w-full h-full xl:flex items-center pt-20 xl:pt-0'>
                    <div className='xl:w-[626px] w-full'>
                      <p className='md:text-[34px] text-[20px] font-medium text-primary mb-[7px]'>Pinturas</p>
                      <h1 className='md:text-[66px] text-[40px]  font-bold text-qblack md:leading-[80px] leading-[40px] mb-[44px]'>
                        En Cuentra Lo Mejor En Pinturas
                      </h1>
                      <Link href='/category/12'>
                        <div className='w-[160px] h-[52px] flex justify-center items-center group rounded bg-primary text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer banner-wrapper mb-[60px]'>
                          <div className='flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10'>
                            <span className='text-sm font-600 tracking-wide leading-7 mr-2'>Explorar</span>
                            <span><svg width='7' height='11' viewBox='0 0 7 11' fill='none' xmlns='http://www.w3.org/2000/svg' className='fill-current'><rect x='2.08984' y='0.636719' width='6.94219' height='1.54271' transform='rotate(45 2.08984 0.636719)' /><rect x='7' y='5.54492' width='6.94219' height='1.54271' transform='rotate(135 7 5.54492)' /></svg></span>
                          </div>
                          <div className='w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]' style={{ transition: 'transform 0.25s ease-in-out 0s' }} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className='item w-full xl:h-[733px] h-[500px]'>
              <div className='imagen w-full h-full relative' style={{ backgroundImage: 'url(/baner2.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className='container-x mx-auto flex items-center  h-full'>
                  <div className='w-full h-full xl:flex items-center pt-20 xl:pt-0'>
                    <div className='xl:w-[626px] w-full'>
                      <p className='md:text-[34px] text-[20px] font-medium text-primary  mb-[7px]'>Clientes</p>
                      <h1 className='md:text-[66px] text-[40px]  font-bold text-black md:leading-[80px] leading-[40px] mb-[44px]'>
                        ¡Nuestra atención al cliente es rápida, personalizada y efectiva!
                      </h1>
                      <Link href='/contact'>
                        <div className='w-[160px] h-[52px] flex justify-center items-center group rounded bg-primary text-white relative transition-all duration-300 ease-in-out overflow-hidden cursor-pointer banner-wrapper mb-[60px]'>
                          <div className='flex space-x-1 items-center transition-all duration-300 ease-in-out relative z-10'>
                            <span className='text-sm font-600 tracking-wide leading-7 mr-2'>Contactanos</span>
                            <span><svg width='7' height='11' viewBox='0 0 7 11' fill='none' xmlns='http://www.w3.org/2000/svg' className='fill-current'><rect x='2.08984' y='0.636719' width='6.94219' height='1.54271' transform='rotate(45 2.08984 0.636719)' /><rect x='7' y='5.54492' width='6.94219' height='1.54271' transform='rotate(135 7 5.54492)' /></svg></span>
                          </div>
                          <div className='w-full h-full bg-black absolute top-0 left-0 right-0 bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-[center_left] group-hover:origin-[center_right]' style={{ transition: 'transform 0.25s ease-in-out 0s' }} />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </Slider>
        </div>
      </div>
    </div>
  )
}
