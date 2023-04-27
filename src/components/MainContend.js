import AOS from 'aos'
import '../../node_modules/aos/dist/aos.css'
import { useEffect } from 'react'
import MainBanners from './MainBanners'
import ToolsSection from './ToolsSection'
import ShopBrands from './ShopBrands'
import TopSellingProducts from './TopSellingProducts'

function Maincontend () {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div className='w-full  pt-[30px] pb-[60px] bg-[#F8F8F8]'>
      <div className='btn w-5 h-5 ' />
      <MainBanners />
      <ToolsSection />
      <ShopBrands />
      <TopSellingProducts />
    </div>
  )
}

export default Maincontend
