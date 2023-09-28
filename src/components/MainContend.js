import AOS from 'aos'
import { useEffect } from 'react'
import MainBanners from './MainBanners'
import ToolsSection from './ToolsSection'
import ShopBrands from './ShopBrands'
import TopSellingProducts from './TopSellingProducts'
// import Carousel from './ui/Carousel'
import Slider from './Slider'
import Carousel from './ui/Carousel'

function Maincontend () {
  useEffect(() => {
    AOS.init()
  }, [])
  return (
    <div className='w-full  pt-[0px] pb-[60px] bg-[#F8F8F8]'>
      <Slider />
      <MainBanners />
      <ToolsSection />
      <ShopBrands />
      <TopSellingProducts />
      <Carousel />
    </div>
  )
}

export default Maincontend
