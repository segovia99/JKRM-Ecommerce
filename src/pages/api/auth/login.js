import { pool } from '@/db/db'
import { sign } from 'jsonwebtoken'
import { serialize } from 'cookie'

export default async function loginHandler (req, res) {
  const { email, password } = req.body

  // if email exists
  const [result] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])

  if (!result.length) {
    return res.status(401).json('user not found')
  }

  if (result[0].contrasena !== password) {
    return res.status(401).json('wrong password')
  }

  // set session
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      email,
      username: email,
      nombre: result[0].nombre,
      apellido: result[0].apellido
    },
    'jkrm'
  )

  const serealized = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    path: '/'

  })

  res.setHeader('Set-Cookie', serealized)
  res.json({ name: result[0].nombre, rol: result[0].rol })
}
