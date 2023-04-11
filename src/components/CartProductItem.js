import Link from 'next/link'

function CartProductItem () {
  return (
    <>

      <div className='flex space-x-[6px] justify-center items-center px-4 my-[20px]'>
        <div className='w-[65px] h-full'>
          <img src='/Products/Producto.jpg' className='w-full h-full object-contain' />
        </div>
        <div className='flex-1 h-full flex flex-col justify-center '>
          <Link href='/'>
            <p className='title mb-2 text-[13px] font-600 text-qblack leading-4 line-clamp-2 hover:text-blue-600'>STANLEY - Flexómetro Tylon de 5 Metros</p>
          </Link>
          <p className='price'>
            <span className='offer-price text-qred font-600 text-[15px] ml-2'>$50</span>
          </p>
        </div>
      </div>

      <span className='mt-[20px] mr-[15px] inline-flex cursor-pointer '><svg width='8' height='8' viewBox='0 0 8 8' fill='none' className='inline fill-current text-[#AAAAAA] hover:text-red-500' xmlns='http://www.w3.org/2000/svg'><path d='M7.76 0.24C7.44 -0.08 6.96 -0.08 6.64 0.24L4 2.88L1.36 0.24C1.04 -0.08 0.56 -0.08 0.24 0.24C-0.08 0.56 -0.08 1.04 0.24 1.36L2.88 4L0.24 6.64C-0.08 6.96 -0.08 7.44 0.24 7.76C0.56 8.08 1.04 8.08 1.36 7.76L4 5.12L6.64 7.76C6.96 8.08 7.44 8.08 7.76 7.76C8.08 7.44 8.08 6.96 7.76 6.64L5.12 4L7.76 1.36C8.08 1.04 8.08 0.56 7.76 0.24Z' /></svg></span>
    </>
  )
}

export default CartProductItem
