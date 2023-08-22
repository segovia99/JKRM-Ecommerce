import Link from 'next/link'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './Icons'

function Footer () {
  return (
    <footer className=' bg-white print:hidden' data-theme='light'>
      <div className='max-w-[1216px] block mx-auto pt-[56px]'>
        <div className='w-full flex flex-col items-center mb-[50px]'>
          <div className='mb-[40px]'>
            <Link href='/'>
              <img src='/logo.webp' width='152' height='36' />
            </Link>
          </div>
          <div className='w-full h-[1px] bg-[#E9E9E9]' />
        </div>
        <div className='lg:flex justify-between mb-[50px]'>
          <div className='lg:w-[424px]  ml-0 w-full mb-10 lg:mb-0'>
            <h1 className='text-[18] font-500 text-[#2F2F2F] mb-5 font-semibold'>Sobre Nosotros</h1>
            <p className='text-[#9A9A9A] text-[15px] w-[247px] leading-[28px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.  tellus felis porta.</p>
          </div>
          <div className='flex-1 lg:flex'>
            <div className='lg:w-1/3 w-full mb-10 lg:mb-0'>
              <div className='mb-5'>
                <h6 className='text-[18] font-500 text-[#2F2F2F] font-semibold'>Avisos y Políticas</h6>
              </div>
              <div>
                <ul className='flex flex-col space-y-4 '>
                  <li>
                    <Link href='/terms-condition'>
                      <span className='text-[#9A9A9A] text-[15px] hover:text-black border-b border-transparent hover:border-black cursor-pointer capitalize'>
                        Terminos y condiciones
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link href='/'>
                      <span className='text-[#9A9A9A] text-[15px] hover:text-black border-b border-transparent hover:border-black cursor-pointer capitalize'>
                        Privacidad
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='lg:w-1/3 lg:flex lg:flex-col items-center w-full mb-10 lg:mb-0 '>
              <div className='mb-5'>
                <h6 className='text-[18] font-500 text-[#2F2F2F] font-semibold'>Categorías más populares</h6>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-bar border-t border-gray-200 lg:h-[82px] lg:flex justify-between items-center'>
          <div className='lg:h-[82px] lg:flex justify-between items-center'>
            <div className='flex lg:space-x-5 justify-between items-center mb-3'>
              <div className='flex space-x-5 items-center'>
                <InstagramIcon />
                <FacebookIcon />
                <YoutubeIcon />
              </div>
              <span className='sm:text-base text-[10px] text-qgray font-300'>©2023 <Link href='/' className='font-500 text-black font-bold mx-1'>JKRM</Link> Todos los derechor reservados</span>
            </div>
          </div>
          <div>
            <img src='/payment.webp' alt='metodos de pago aceptados' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
