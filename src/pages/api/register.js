import { pool } from '@/db/db'

export default async function handler (req, res) {
  try {
    const { nombre, apellido, direccion, email, password } = req.body
    await pool.query('INSERT INTO usuarios (nombre, apellido, direccion, email, contrasena , rol) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, direccion, email, password, 2])
    res.status(200).json({ message: 'Usuario registrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
