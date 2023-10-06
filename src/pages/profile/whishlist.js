import Layout from '@/components/customerinfo/Layout'
import LandingLayout from '@/components/layouts/LandingLayout'
import React from 'react'

const Whishlist = () => {
  return (
    <LandingLayout>
      <Layout>
        <div className='flex-1'>
          <div className='item-body dashboard-wrapper w-full'>
            <div className='relative w-full overflow-x-auto sm:rounded-lg'>
              <div className='flex flex-col items-center justify-center'>
                <h1 className='text-xl tracking-wide font-bold text-qblack flex items-center mb-2'>Próximamente</h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </LandingLayout>
  )
}

export default Whishlist
