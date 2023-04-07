import Link from 'next/link'
import Services from './Services'

function MainBanners () {
  return (
    <div className='w-full banner-wrapper mb-[60px]'>
      <div className='container-x mx-auto'>
        <div className='w-full'>
          <div className='banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px]'>
            <div data-aos='fade-right' className='xl:w-[740px] w-full h-full'>
              <Link href='/'>
                <picture>
                  <source media='(min-width:1025px)' srcSet='/banner1.png' />
                  <img src='/banner1.2.png' alt='' className='w-full max-w-full h-auto object-cover' />
                </picture>
              </Link>
            </div>
            <div data-aos='fade-left' className='flex-1 flex xl:flex-col flex-row xl:space-y-[30px] h-full object-cover'>
              <div className='w-full xl:h-1/2'>
                <Link href='/single-product'>
                  <img src='/banner-2.png' alt='' className='w-full h-full' />
                </Link>
              </div>
              <div className='w-full xl:h-1/2'>
                <Link href='/single-product'>
                  <img src='/banner-3.png' alt='' className='w-full h-full' />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Services />
      </div>
    </div>
  )
}

export default MainBanners
