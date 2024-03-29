import { useState, useEffect } from 'react'
import LandingLayout from '@/components/layouts/LandingLayout'
import { WishList } from '@/components/WishList'
import axios from 'axios'
import { useCart } from '@/hooks/useCart'
import { useSession } from 'next-auth/react'

export default function WishListPage () {
  const [list, setList] = useState([])
  const { addToCart } = useCart()
  const { data: session } = useSession()

  const loadList = async () => {
    const response = await axios.get('/api/wishlist', { params: { userId: session.user.id } })
    setList(response.data)
  }

  useEffect(() => {
    if (session) loadList()
  }, [session])

  return (
    <LandingLayout>
      <div className='w-full  pt-0 pb-0'>
        <div className='cart-page-wrapper w-full bg-white pb-[60px]'>
          <div className='w-full'>
            <div className='capage-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10'>
              <div className='container-x mx-auto'>
                <div className='flex justify-center'>
                  <h1 className='text-3xl font-semibold text-qblack'>Wishlist</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full mt-[8px]'>
            <div className='container-x mx-auto'>
              <div className='w-full mb-[30px]'>
                <div className='relative w-full overflow-x-auto border border-[#EDEDED]'>
                  <WishList
                    products={list} addToCart={addToCart} setList={setList}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  )
}
