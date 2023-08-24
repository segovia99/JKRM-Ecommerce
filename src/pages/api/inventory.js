import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [result] = await pool.query('SELECT p.*, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.id_categorias = c.id')
    res.status(200).json(result)
  }

  if (req.method === 'POST') {
    const { nombre, descripcion, precio, cantidad, url, marca } = req.body
    await pool.query('INSERT INTO productos(id_categorias, nombre, descripcion, precio, cantidad, url, marca) VALUES(?, ?, ?, ?, ?, ?, ?)', [1, nombre, descripcion, precio, cantidad, url, marca])

    const [result] = await pool.query('SELECT p.*, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.id_categorias = c.id ORDER BY p.id DESC')
    res.status(200).json(result)
  }

  if (req.method === 'PUT') {
    const { nombre, descripcion, precio, cantidad, url, marca, id } = req.body
    await pool.query('UPDATE productos SET nombre=?, descripcion=?, precio=?, cantidad=?, url=?, marca=? WHERE id=?', [nombre, descripcion, precio, cantidad, url, marca, id])

    const [result] = await pool.query('SELECT p.*, c.nombre AS categoria FROM productos p INNER JOIN categorias c ON p.id_categorias = c.id')
    res.status(200).json(result)
  }
}
