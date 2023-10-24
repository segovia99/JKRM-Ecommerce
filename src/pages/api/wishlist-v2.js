import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { idUsuario, idProducto } = req.body

    const [result] = await pool.query(`SELECT COUNT(*) AS registros
    FROM wishlist
    WHERE id_usuario=?
    AND id_producto=?
    `, [idUsuario, idProducto])
    res.status(200).json(result)
  }

  if (req.method === 'GET') {
    const { userId } = req.query

    const [result] = await pool.query(`SELECT COUNT(*) AS items
    FROM wishlist
    WHERE id_usuario=?
    `, [userId])
    res.status(200).json(result)
  }
}
