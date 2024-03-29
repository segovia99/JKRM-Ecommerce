import Slider from 'react-slick'

export default function Carousel () {
  // let option = 1

  // useEffect(() => {
  //   paint()
  //   const autoplayInterval = setInterval(() => {
  //     toRight() // Cambia automáticamente a la siguiente opción
  //   }, 2000) // Intervalo en milisegundos (3 segundos)

  //   return () => {
  //     clearInterval(autoplayInterval) // Limpia el intervalo al desmontar el componente
  //   }
  // }, [])

  const settings = {
    dots: false,
    fade: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 700
  }

  // const paint = () => {
  //   // const control1 = document.getElementById('control-1')
  //   // const control2 = document.getElementById('control-2')
  //   // const control3 = document.getElementById('control-3')
  //   // const controls = [control1, control2, control3]

  //   // for (let i = 0; i < 3; i++) {
  //   //   if ((i + 1) === option) {
  //   //     controls[i].style.backgroundColor = 'silver'
  //   //   } else {
  //   //     controls[i].style.backgroundColor = 'gray'
  //   //   }
  //   // }
  // }

  // // const toLeft = () => {
  // //   const slide = document.getElementById('slide')
  // //   if (option > 1) {
  // //     option--
  // //     slide.style.transform = 'translate(-' + (option - 1) * 33.33 + '%, 0%)'
  // //   }

  // //   paint()
  // // }

  // const toRight = () => {
  //   const slide = document.getElementById('slide')
  //   if (option < 3) {
  //     slide.style.transform = 'translate(-' + 33.33 * option + '%, 0%)'
  //     option++
  //   } else {
  //     option = 0
  //   }

  //   paint()
  // }

  return (

    <div className='w-[100%]'>
      <Slider {...settings}>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='/carousel-banner-1.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='/carousel-banner-2.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='carousel-banner-3.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='/carousel-banner-1.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='/carousel-banner-2.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='carousel-banner-3.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='/carousel-banner-1.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='/carousel-banner-2.png' />
        </div>
        <div>
          <img className='w-full h-[260px] ' alt='temp' src='carousel-banner-3.png' />
        </div>
      </Slider>

      {/* <div className='carousel-controls mt-[30px] mb-[30px]'>
          <button onClick={toLeft} id='left-button'>
            <img alt='left' src='/left-arrow.svg' />
          </button>
          <div id='control-1' />
          <div id='control-2' />
          <div id='control-3' />
          <button onClick={toRight} id='right-button'>
            <img alt='right' src='/right-arrow.svg' />
          </button>
        </div> */}
    </div>
  )
}
