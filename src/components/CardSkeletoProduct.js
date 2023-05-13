import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CardSkeletoProduct () {
  return (
    <div className='product-card-one w-full h-full bg-white relative group overflow-hidden' style={{ boxShadow: ' rgba(0, 0, 0, 0.05) 0px 15px 64px 0px' }}>
      <div
        className='product-card-img w-full h-[300px]' style={{
          backgroundSize: '300px 300px'
        }}
      >
        <Skeleton height={300} width={300} />
      </div>
      <div className='mt-2 mx-auto w-[210px] h-[40px]'>
        <Skeleton count={1} className='w-full h-full' />
      </div>
      <div className='w-[80px] h-[30px] ml-8 mt-2'>
        <Skeleton count={1} className='w-full h-full' />
      </div>
    </div>
  )
}
