import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [result] = await pool.query('SELECT id, nombre, descripcion, precio, id_categorias, cantidad, url, marca, precio - (precio * (descuento / 100)) AS descuento FROM productos')
    res.status(200).json(result)
  }

  if (req.method === 'POST') {
    const { id } = req.body
    const [result] = await pool.query('SELECT id, nombre, descripcion, precio, id_categorias, cantidad, url, marca, precio - (precio * (descuento / 100)) AS descuento FROM productos where id_categorias=?', [id])
    res.status(200).json(result)
  }
}
