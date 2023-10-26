import LandingLayout from '@/components/layouts/LandingLayout'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios'
import { useCart } from '@/hooks/useCart'
import CheckoutProduct from '@/components/CheckoutProduct'
import { useRouter } from 'next/router'
import { CLIENTID } from '@/services/config'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const Checkout = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const { cart, calculateTotal, clearCart } = useCart()

  return (
    <LandingLayout>
      <div className='w-full  pt-0 pb-0'>
        <div className='checkout-page-wrapper w-full bg-white pb-[60px]'>
          <div className='w-full mb-5'>
            <div className='page-title-wrapper bg-[#FFFAEF] w-full h-[173px] py-10'>
              <div className='container-x mx-auto'>
                <div className='mb-5'>
                  <div className='flex justify-center'>
                    <h1 className='text-3xl font-semibold text-qblack'>Finaliza tu compra</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='checkout-main-content w-full'>
            <div className='container-x mx-auto'>
              <div className='w-full lg:flex lg:space-x-[30px]'>
                {session
                  ? (
                    <div className='lg:w-1/2 w-full'>
                      <h1 className='sm:text-2xl text-xl text-qblack font-medium mb-5'>Detalles de facturación</h1>
                      <div className='w-[70%] px-10 py-[30px] border border-[#EDEDED]'>
                        <h2 className='text-qblack font-medium mb-5'>Direccion de Envio</h2>
                        <p>{session.user.direccion}</p>
                      </div>
                    </div>
                    )
                  : (
                    <div className='lg:w-1/2 w-full'>
                      <h1 className='sm:text-2xl text-xl text-qblack font-medium mb-5'>Inicia Sesion para seguir con tu compra</h1>
                      <div className='w-[70%] px-10 py-[30px] border border-[#EDEDED]'>
                        <div>
                          <label
                            htmlFor='my-modal'
                            className='flex h-full items-center border-b-2 text-sm cursor-pointer btn btn-primary'
                          >
                            Inicia sesión
                          </label>
                          <Link href='/signup' className='btn btn-ghost flex h-full items-center border-b-2 text-sm cursor-pointer my-2'>Registrate</Link>
                        </div>
                      </div>
                    </div>
                    )}
                <div className='flex-1'>
                  <h1 className='sm:text-2xl text-xl text-qblack font-medium mb-5'>Resumen del pedido</h1>
                  <div className='w-full px-10 py-[30px] border border-[#EDEDED]'>
                    <div className='sub-total mb-6'>
                      <div className=' flex justify-between mb-5'>
                        <p className='text-[13px] font-medium text-qblack uppercase'>Productos</p>
                        <p className='text-[13px] font-medium text-qblack uppercase'>Total</p>
                      </div>
                      <div className='w-full h-[1px] bg-[#EDEDED]' />
                      <div className='product-list w-full mb-[30px]'>
                        <CheckoutProduct cart={cart} />
                      </div>
                      <div className='w-full h-[1px] bg-[#EDEDED]' />
                      <div className='mt-[30px]'>
                        <div className=' flex justify-between mb-5'>
                          <p className='text-2xl font-medium text-qblack'>Total</p>
                          <p className='text-2xl font-medium text-qred'>${calculateTotal()}</p>
                        </div>

                        <div className='shipping mt-[30px]'>
                          {
                            session && (
                              <PayPalScriptProvider options={{ 'client-id': CLIENTID, locale: 'es_ES' }}>
                                <PayPalButtons
                                  style={{ layout: 'vertical' }}
                                  createOrder={async () => {
                                    try {
                                      const res = await axios.post('/api/payment', { amount: calculateTotal() })
                                      return res.data.id
                                    } catch (error) {

                                    }
                                  }}
                                  onCancel={data => console.log(data)}
                                  onApprove={(data, actions) => actions.order.capture().then(data => {
                                    const { id } = data
                                    const total = calculateTotal()
                                    fetch('/api/orderEmail', { method: 'POST', body: JSON.stringify({ id, nombre: session.user.nombre, email: session.user.email, products: cart, total }) })
                                    fetch('/api/pedido', { method: 'POST', body: JSON.stringify({ id, userId: session.user.id, products: cart, total }) })
                                    clearCart()
                                    router.push(`/paymentSuccess/${id}`)
                                  })}
                                />
                              </PayPalScriptProvider>
                            )
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  )
}

export default Checkout
