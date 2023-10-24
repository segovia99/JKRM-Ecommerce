import { useState, useEffect } from 'react'
import LandingLayout from '@/components/layouts/LandingLayout'
import { WishList } from '@/components/WishList'
import axios from 'axios'
import { useUserStore } from '@/store/loginStore'
import { useCart } from '@/hooks/useCart'
import { jwtVerify } from 'jose'

export default function WishListPage ({ IsLogin, User }) {
  const [list, setList] = useState([])
  const { user } = useUserStore()
  const { addToCart } = useCart()

  const loadList = async () => {
    const response = await axios.get('/api/wishlist', { params: { userId: user.id } })
    setList(response.data)
  }
  const { setIsLogin, setUser } = useUserStore()
  useEffect(() => {
    setIsLogin(IsLogin)
    setUser(User)
  }, [])
  useEffect(() => {
    loadList()
  }, [])
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

export async function getServerSideProps (context) {
  const { token } = context.req.cookies
  let IsLogin = false
  let User = null
  if (token) {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode('jkrm')
    )
    if (payload) {
      IsLogin = true
      const { id, nombre, apellido, email, direccion, rol } = payload
      User = { id, nombre, apellido, email, direccion }
      if (rol === 1) {
        context.res.writeHead(302, {
          Location: '/admin/dashboardsales' // URL de la página a la que se redireccionará
        })
        context.res.end()
      }
    }
  }

  // console.log(IsLogin)
  return {
    props: {
      IsLogin,
      User
    }
  }
}
