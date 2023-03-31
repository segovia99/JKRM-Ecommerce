import LandingLayout from '@/layouts/LandingLayout'
import '@/styles/globals.css'

export default function App ({ Component, pageProps }) {
  return (
    <LandingLayout>
      <Component {...pageProps} />
    </LandingLayout>
  )
}
