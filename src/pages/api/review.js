import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    const [result] = await pool.query(`SELECT * FROM review WHERE id_producto = ${id} ORDER BY id DESC`)
    res.status(200).json(result)
  }

  if (req.method === 'POST') {
    try {
      const { productId, nombre, comentario, rating } = req.body
      await pool.query('INSERT INTO review (id_producto, nombre, feedback, valoracion) VALUES (?, ?, ?, ?)', [productId, nombre, comentario, rating])
      res.status(200)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
