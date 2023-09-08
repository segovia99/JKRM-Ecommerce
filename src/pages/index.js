
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

import Maincontend from '@/components/MainContend'
import LandingLayout from '@/components/layouts/LandingLayout'
import { useUserStore } from '@/store/loginStore'
import { jwtVerify } from 'jose'
import { useEffect } from 'react'

// const inter = Inter({ subsets: ['latin'] })

export default function Home ({ IsLogin, User }) {
  const { setIsLogin, setUser } = useUserStore()
  useEffect(() => {
    setIsLogin(IsLogin)
    setUser(User)
  }, [])
  return (
    <LandingLayout>
      <Maincontend />
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
          Location: '/admin/dashboard' // URL de la página a la que se redireccionará
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
