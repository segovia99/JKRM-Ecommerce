import Link from 'next/link'
import { CartIcon, FavoriteIcon } from './Icons'
import NavActions from './NavActions'
import NavTabs from './NavTabs'
import MobileHeader from './MobileHeader'
import Search from './Search'
import Cart from './Cart'
import { useCart } from '@/hooks/useCart'
import { useUserStore } from '@/store/loginStore'
import { useWishlistStore } from '@/store/wishlistStore'
import { useEffect } from 'react'

const LandingNavbar = () => {
  const { cart } = useCart()
  const { isLogin, user } = useUserStore()
  const { items, setItems } = useWishlistStore()

  useEffect(() => {
    fetch(`/api/wishlist-v2?userId=${user.id}`)
      .then(res => res.json())
      .then(data => { setItems(data[0].items) })
  }, [])

  return (

    <header className='header-section-wrapper relative' data-theme='light'>
      <div className='w-full h-[86px] bg-white lg:block hidden'>
        <div className='mx-auto max-w-[1216px] h-full'>
          <div className='relative h-full'>
            <div className='flex justify-between items-center h-full'>
              <Link href='/'>
                <img src='/logo.webp' width='152' height='36' />
              </Link>
              <Search />

              <div className='flex space-x-6 items-center'>
                {
                  isLogin && (
                    <div className='relative'>
                      <Link href='/wishlist'>
                        <span><FavoriteIcon /></span>
                        <span className='w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-[#db1436] text-white'>{items}</span>
                      </Link>
                    </div>
                  )
                }
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
      <MobileHeader cartCount={cart.length} />
      <NavTabs />
    </header>
  )
}

export default LandingNavbar
