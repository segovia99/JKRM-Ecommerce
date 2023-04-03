
import { CartIcon, MenuIcon } from './Icons'
import Link from 'next/link'

function MobileHeader () {
  return (
    <div className='lg:hidden block w-full h-[60px] bg-white'>
      <div className='w-full h-full flex justify-between items-center px-5'>
        <div>
          <MenuIcon />
        </div>
        <div>
          <Link href='/'>
            <img src='/logo.webp' width='117' height='16' />
          </Link>
        </div>
        <div className='cart relative cursor-pointer'>
          <Link href='/'>
            <span>
              <CartIcon />
            </span>
          </Link>
          <span className='w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] bg-qyellow text-qblack'>10</span>
        </div>
      </div>
    </div>
  )
}

export default MobileHeader
