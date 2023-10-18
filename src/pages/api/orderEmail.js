import { transporter } from '@/services/emails/mailer'

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  const { id, nombre, email, products, total } = JSON.parse(req.body)

  let html = ''

  products.forEach((product) => {
    html += `
    <tr>
        <td style="border: 1px solid #ddd;">${product.nombre}</td>
        <td style="border: 1px solid #ddd;">${product.quantity}</td>
        <td style="border: 1px solid #ddd;">$${product.precio}</td>
        <td style="border: 1px solid #ddd;">$${product.subtotal}</td>
    </tr>
    `
  })

  await transporter.sendMail({
    from: '"Ferreteria JKRM" <ferreteria.jkrm@gmail.com>', // sender address
    to: `${email}`, // receiver
    subject: `Tu pedido #${id} de ferreteria JKRM`, // Subject line
    html: `
    <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Pedido</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
        <tr>
            <td bgcolor="#f5f5f5" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td style="padding: 0 40px;">
                            <img src="https://jkrm-ecommerce.vercel.app/logo.webp" alt="Logo de la tienda" width="150" height="auto" style="display: block;">
                        </td>
                        <td align="right" style="padding: 0 40px;">
                            <h3 style="margin-top: 0;">Confirmación del Pedido</h3>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td bgcolor="#ffffff" style="padding: 40px;">
                <p style="color: #db1436; font-size: 24px;">Hola ${nombre},</p>
                <p style="font-size:18px;">Gracias por comprar con nosotros. Te enviaremos una confirmación cuando tus artículos se envíen.</p>
                <table border="1" cellpadding="10" cellspacing="0" width="100%" style="border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ddd;">Producto</th>
                            <th style="border: 1px solid #ddd;">Cantidad</th>
                            <th style="border: 1px solid #ddd;">Precio unitario</th>
                            <th style="border: 1px solid #ddd;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${html}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="3" align="right" style="border: 1px solid #ddd;">Total:</td>
                            <td style="border: 1px solid #ddd;">$${total}</td>
                        </tr>
                    </tfoot>
                </table>
                <p style="font-size:18px;">Esperamos volver a verte pronto.</p>
            </td>
        </tr>
    </table>
</body>
</html>
    `
  })

  res.status(200).json({ message: 'Email sent' })
}
