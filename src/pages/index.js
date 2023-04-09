
// import { Inter } from 'next/font/google'
// import styles from '@/styles/Home.module.css'

import Maincontend from '@/components/MainContend'
import LandingLayout from '@/components/layouts/LandingLayout'

// const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <LandingLayout>
      <Maincontend />
    </LandingLayout>
  )
}
