import { pool } from '@/db/db'
import { getServerSession } from 'next-auth'

export default async function handler (req, res) {
  const session = await getServerSession(req, res)

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }

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

  if (req.method === 'PUT') {
    const { id, nombre, apellido, direccion } = req.body
    await pool.query('UPDATE usuarios SET nombre = ?, apellido = ?, direccion = ? WHERE id = ?', [nombre, apellido, direccion, id])
    console.log('los')
    res.status(200).json({ message: 'Usuario actualizado' })
  }
}
