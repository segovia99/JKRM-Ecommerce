import { pool } from '@/db/db'

export default async function handler (req, res) {
  const { id, state } = req.query
  if (req.method === 'POST') {
    const [result] = await pool.query('SELECT * FROM pedidos where id_usuario = ? AND estado_pedido=? ORDER BY Fecha_Pedido DESC', [id, state])
    res.status(200).json(result)
  }
}
