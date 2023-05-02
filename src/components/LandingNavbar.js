import Link from 'next/link'
import { CartIcon, FavoriteIcon } from './Icons'
import NavActions from './NavActions'
import NavTabs from './NavTabs'
import MobileHeader from './MobileHeader'
import Search from './Search'
import Cart from './Cart'
import { useCart } from '@/hooks/useCart'

const LandingNavbar = () => {
  const { cart } = useCart()
  return (

    <header className='header-section-wrapper relative'>
      <div className='w-full h-[86px] bg-white lg:block hidden mt-2'>
        <div className='mx-auto max-w-[1216px] h-full'>
          <div className='relative h-full'>
            <div className='flex justify-between items-center h-full'>
              <Link href='/'>
                <img src='/logo.webp' width='152' height='36' />
              </Link>
              <Search />

              <div className='flex space-x-6 items-center'>
                <div className='relative'>
                  <Link href='/'>
                    <span><FavoriteIcon /></span>
                    <span className='w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[#db1436] text-white'>0</span>
                  </Link>
                </div>
                <div className='cart-wrapper group relative py-4'>
                  <div className='cart relative cursor-pointer'>
                    <span><CartIcon /></span>
                    <span className='w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[#db1436] text-white'>{cart.length}</span>
                  </div>
                  <Cart />
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
