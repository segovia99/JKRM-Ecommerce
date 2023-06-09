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
      id: result[0].id,
      nombre: result[0].nombre,
      apellido: result[0].apellido,
      email,
      direccion: result[0].direccion,
      rol: result[0].rol
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
  const User = { id: result[0].id, nombre: result[0].nombre, apellido: result[0].apellido, email: result[0].email, direccion: result[0].direccion, rol: result[0].rol }
  res.setHeader('Set-Cookie', serealized)
  res.json({ name: result[0].nombre, rol: result[0].rol, User })
}
