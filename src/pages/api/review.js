import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    const [result] = await pool.query(`SELECT * FROM review WHERE id_producto = ${id} ORDER BY id DESC`)
    res.status(200).json(result)
  }

  if (req.method === 'POST') {
    try {
      const { productId, nombre, feedback, valoracion } = req.body
      await pool.query('INSERT INTO review (id_producto, nombre, feedback, valoracion, fecha) VALUES (?, ?, ?, ?, date_format(curdate(), "%Y-%m-%d"))', [productId, nombre, feedback, valoracion])
      res.status(200)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
