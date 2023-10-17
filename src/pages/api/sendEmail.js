import { transporter } from '@/services/emails/mailer'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { email, name, subject, message } = req.body
    await transporter.sendMail({
      from: '"Ferreteria JKRM" <ferreteria.jkrm@gmail.com>', // sender address
      to: 'ferreteria.jkrm@gmail.com', // receiver
      subject: `${subject}`, // Subject line
      text: `Nombre: ${name} \n\nEmail: ${email} \n\nMensaje: ${message} \n`
    })

    res.status(200).json({ message: 'Mensaje enviado' })
  }
}
