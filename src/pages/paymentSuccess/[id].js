import EmphasizeText from '@/components/EmphasizeText'
import LandingLayout from '@/components/layouts/LandingLayout'
import Link from 'next/link'
import Lottie from 'lottie-react'
import success from 'success.json'

export default function PaymentSuccess () {
  return (
    <LandingLayout>
      <div className='mx-auto mb-8 grid max-w-3xl place-items-center text-center p-2' data-theme='light'>
        <div className=' w-52 h-52'>
          <Lottie animationData={success} loop={false} />
        </div>
        <h1 className='relative mb-4 text-2xl font-bold'>
          ¡Genial!
          <EmphasizeText />
        </h1>
        <div className='flex flex-col gap-4'>
          <p>
            Tu pedido se ha realizado correctamente. En breve recibirás un correo
            electrónico con los detalles de tu pedido.
          </p>
          <p>
            Si tienes alguna duda, puedes{' '}
            <Link href='/contact' className='text-[#db1436]'>
              contactar con nosotros.
            </Link>
          </p>
          <div className='flex flex-wrap justify-center gap-8'>
            <Link href='/' className='text-[#db1436]'>
              Volver a la página principal
            </Link>
            <span className='h-6 w-px bg-gray-400' aria-hidden='true' />
            <Link href='/catalogo' className='text-[#db1436]'>
              Ver todos los productos
            </Link>
          </div>
        </div>
      </div>
    </LandingLayout>
  )
}

export async function getServerSideProps (context) {
  const { id } = context.query
  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
}
