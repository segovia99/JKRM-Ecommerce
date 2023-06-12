import { pool } from '@/db/db'

export default async function handler (req, res) {
  const { id } = req.query
  if (req.method === 'GET') {
    const [result] = await pool.query('SELECT * FROM pedidos where id_usuario = ? ORDER BY Fecha_Pedido DESC', [id])
    res.status(200).json(result)
  }
}
