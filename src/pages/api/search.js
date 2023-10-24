import { pool } from '@/db/db'

export default async function handler (req, res) {
  const { id, q } = req.query

  // we have an id available
  if (id) {
    const [result] = await pool.query(`SELECT id, nombre, descripcion, precio, id_categorias, cantidad, url, marca, precio - (precio * (descuento / 100)) AS descuento FROM productos WHERE id = ${id}`)
    return res.status(200).json(result)
  }

  // we have a keyword to search for
  if (q) {
    const [results] = await pool.query(`SELECT * FROM productos WHERE nombre LIKE '%${q}%'`)
    return res.status(200).json(results)
  }

  // we don't have anything
  res.status(400).json()
}
