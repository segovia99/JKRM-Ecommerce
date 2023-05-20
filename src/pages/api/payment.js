import { CLIENTID, CLIENTSECRET } from '@/services/config'

const paypal = require('@paypal/checkout-server-sdk')

const environment = new paypal.core.SandboxEnvironment(CLIENTID, CLIENTSECRET)
const client = new paypal.core.PayPalHttpClient(environment)

export default async function handler (req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  const { amount } = req.body
  const request = new paypal.orders.OrdersCreateRequest()
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: amount
        }
      }
    ]
  })
  const response = await client.execute(request)
  res.json({ id: response.result.id })
}
