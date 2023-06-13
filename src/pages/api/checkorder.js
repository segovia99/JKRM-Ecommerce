import { pool } from '@/db/db'

export default async function handler (req, res) {
  let newState = ''
  if (req.method === 'POST') {
    const { id, estado } = req.body

    if (estado === '1') newState = '2'
    if (estado === '2') newState = '3'
    if (estado === '3') newState = '3'

    const [result] = await pool.query('UPDATE pedidos SET estado_pedido = ? WHERE id = ?', [newState, id])
    res.status(200).json({ result })
  }
}
