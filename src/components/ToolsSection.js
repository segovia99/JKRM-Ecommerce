import Link from 'next/link'
import { ArrowRIcon } from './Icons'
import ProductCardOne from './ProductCardOne'

function ToolsSection () {
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
                <ProductCardOne />
                <ProductCardOne />
                <ProductCardOne />
                <ProductCardOne />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToolsSection