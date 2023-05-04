import Link from 'next/link'

export default function ProductCardTwo ({ img, title, price, id, addToCart }) {
  return (
    <div data-aos='fade-left' className='product-row-card-style-one w-full h-[250px] bg-white group relative overflow-hidden aos-init aos-animate'>
      <div className='flex space-x-5 items-center w-full h-full lg:p-[30px] sm:p-5 p-2'>
        <div className='lg:w-1/2 w-1/3 h-full'>
          <img src={img} className='w-full h-full object-contain' />
        </div>
        <div className='flex-1 flex flex-col justify-center h-full'>
          <div>
            <div className='flex space-x-1 mb-3'><span><svg width='18' height='17' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z' fill='#FFA800' /></svg></span><span><svg width='18' height='17' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z' fill='#FFA800' /></svg></span><span><svg width='18' height='17' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z' fill='#FFA800' /></svg></span><span><svg width='18' height='17' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z' fill='#FFA800' /></svg></span><span><svg width='18' height='17' viewBox='0 0 18 17' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z' fill='#FFA800' /></svg></span></div>
            <Link href={`/detail/${id}`}>
              <p className='title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600'>
                {title}
              </p>
            </Link>
            <p className='price mb-[26px]'>
              <span className='offer-price text-qred font-600 sm:text-[18px] text-base ml-2'>
                ${price}
              </span>
            </p>
            <button type='button' className='w-[160px] h-[30px] text-white' onClick={addToCart}>
              <span className='red-btn text-white'>
                Agregar al Carrito
              </span>
            </button>

          </div>
        </div>

      </div>
    </div>
  )
}
