import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const { userId } = req.query

    const [result] = await pool.query(`
    SELECT p.id, p.nombre,p.descripcion,p.id_categorias,p.marca, p.cantidad, p.url, p.precio, p.precio - (p.precio * (p.descuento / 100)) AS descuento
    FROM wishlist w
    JOIN productos p ON w.id_producto = p.id
    WHERE w.id_usuario = ?;
    `, [userId])

    res.status(200).json(result)
  }

  if (req.method === 'POST') {
    const { idUsuario, idProducto } = req.body

    await pool.query('INSERT INTO wishlist(id_usuario, id_producto) VALUES(?, ?)', [idUsuario, idProducto])
    res.status(200).json({ message: 'ok' })
  }

  if (req.method === 'DELETE') {
    try {
      const { idUsuario, idProducto } = req.query
      await pool.query('DELETE FROM wishlist WHERE id_usuario=? AND id_producto=?', [idUsuario, idProducto])

      res.status(200).json({ message: 'ok' })
    } catch (error) {
      console.log(error)
    }
  }
}
