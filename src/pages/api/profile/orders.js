import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const { id } = req.body
    const [result] = await pool.query(
      `SELECT id_usuario,
    SUM(CASE WHEN estado_pedido = 1 THEN 1 ELSE 0 END) AS pendientes,
    SUM(CASE WHEN estado_pedido = 2 THEN 1 ELSE 0 END) AS enviados,
    SUM(CASE WHEN estado_pedido = 3 THEN 1 ELSE 0 END) AS completados
FROM pedidos
WHERE id_usuario=?
GROUP BY id_usuario`, [id]
    )
    res.status(200).json(result)
  }
}
