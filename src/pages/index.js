
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

import LandingLayout from '@/layouts/LandingLayout'

// const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <LandingLayout>
      <h1>Hola desde home</h1>
    </LandingLayout>
  )
}
