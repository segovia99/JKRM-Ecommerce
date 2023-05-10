
import { CartIcon, MenuIcon } from './Icons'
import Link from 'next/link'

function MobileHeader ({ cartCount = 0 }) {
  return (
    <div className='lg:hidden block w-full h-[60px] bg-white'>
      <div className='w-full h-full flex justify-between items-center px-5'>
        <div>
          <MenuIcon />
        </div>
        <div>
          <Link href='/'>
            <img src='/logo.webp' width='117' height='16' alt='logo' />
          </Link>
        </div>
        <div className='cart relative cursor-pointer'>
          <Link href='/cart'>
            <span>
              <CartIcon />
            </span>
          </Link>
          <span className='w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow text-qblack'>{cartCount}</span>
        </div>
      </div>
    </div>
  )
}

export default MobileHeader
