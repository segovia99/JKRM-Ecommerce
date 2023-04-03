import Link from 'next/link'
import { CartIcon, FavoriteIcon, SearchIcon } from './Icons'
import NavActions from './NavActions'
import NavTabs from './NavTabs'
import MobileHeader from './MobileHeader'

const LandingNavbar = () => {
  return (

    <header className='header-section-wrapper relative'>
      <div className='w-full h-[86px] bg-white lg:block hidden mt-2'>
        <div className='mx-auto max-w-[1216px] h-full'>
          <div className='relative h-full'>
            <div className='flex justify-between items-center h-full'>
              <Link href='/'>
                <img src='/logo.webp' width='152' height='36' />
              </Link>
              <form className='border-whop-stroke relative flex w-full max-w-[500px] items-stretch rounded-md border border-solid outline-2 transition'>
                <input type='text' placeholder='Buscar Producto' className='text2 placeholder:text-whop-gray flex-1 rounded-l-md border-none px-3 py-[11px] outline-none' />
                <button className='text-white border-whop-stroke text-whop-dark-gray hover:bg-whop-hover active:bg-whop-hover-press flex items-center rounded-r-md border-0 border-l border-solid bg-[#db1436] px-6 transition'><SearchIcon /></button>
              </form>

              <div className='flex space-x-6 items-center'>
                <div className='relative'>
                  <Link href='/'>
                    <span><FavoriteIcon /></span>
                    <span className='w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[#db1436] text-white'>1</span>
                  </Link>
                </div>
                <div className='cart-wrapper group relative py-4'>
                  <div className='cart relative cursor-pointer'>
                    <span><CartIcon /></span>
                    <span className='w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[#db1436] text-white'>5</span>
                  </div>
                </div>
                <NavActions />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileHeader />
      <NavTabs />
    </header>
  )
}

export default LandingNavbar
