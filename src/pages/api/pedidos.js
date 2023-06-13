import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [result] = await pool.query('SELECT usuarios.id, usuarios.nombre, usuarios.apellido, usuarios.email,pedidos.id as id_pedido, pedidos.id_usuario, pedidos.fecha_pedido, pedidos.total, pedidos.estado_pedido FROM usuarios INNER JOIN pedidos ON usuarios.id = pedidos.id_usuario ORDER BY pedidos.fecha_pedido DESC')

    res.status(200).json(result)
  }
}
