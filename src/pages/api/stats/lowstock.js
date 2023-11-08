import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [products] = await pool.query('SELECT nombre, cantidad, url  FROM productos WHERE cantidad < 10')

    res.status(200).json(products)
  }
}
