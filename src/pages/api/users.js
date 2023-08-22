import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [result] = await pool.query('SELECT * FROM usuarios WHERE rol != 2')

    res.status(200).json(result)
  }

  if (req.method === 'POST') {
    try {
      const { nombre, apellido, direccion, email, password, rol } = req.body
      await pool.query('INSERT INTO usuarios (nombre, apellido, direccion, email, contrasena , rol) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, direccion, email, password, rol])
      res.status(200).json({ message: 'Usuario registrado' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
