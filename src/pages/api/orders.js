import { pool } from '@/db/db'
import { getServerSession } from 'next-auth'

export default async function handler (req, res) {
  const session = await getServerSession(req, res)

  if (!session) {
    res.status(401).json({ message: 'You must be logged in.' })
    return
  }

  const { id } = req.query
  if (req.method === 'GET') {
    const [result] = await pool.query('SELECT * FROM pedidos where id_usuario = ? ORDER BY Fecha_Pedido DESC', [id])
    res.status(200).json(result)
  }
}
