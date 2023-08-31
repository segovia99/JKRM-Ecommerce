import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function BannersSkeleto () {
  return (
    <div className='w-full banner-wrapper mb-[60px]'>
      <div className='container-x mx-auto'>
        <div className='w-full  relative group overflow-hidden'>
          <div className='banner-card xl:flex xl:space-x-[30px] xl:h-[600px]  mb-[30px] '>
            <div
              className='xl:w-[740px] w-full h-full cursor-pointer'
            >
              <SkeletonTheme baseColor='#2a303c' highlightColor='#db1436'>
                <Skeleton count={1} className='w-full h-full' />
              </SkeletonTheme>
            </div>
            <div className='flex-1 flex xl:flex-col flex-row xl:space-y-[30px] h-full object-cover'>
              <div className='w-full xl:h-1/2 cursor-pointer'>
                <SkeletonTheme baseColor='#2a303c' highlightColor='#db1436'>
                  <Skeleton count={1} className='w-full h-full' />
                </SkeletonTheme>
              </div>
              <div className='w-full xl:h-1/2 cursor-pointer'>
                <SkeletonTheme baseColor='#2a303c' highlightColor='#db1436'>
                  <Skeleton count={1} className='w-full h-full' />
                </SkeletonTheme>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
