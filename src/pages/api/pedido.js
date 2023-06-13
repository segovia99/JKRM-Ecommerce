import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    const { id, userId, total, products } = data
    await pool.query(`
        INSERT INTO pedidos (id, fecha_pedido, id_usuario, total, estado_pedido)
        VALUES (?,CONVERT_TZ(NOW(), 'UTC', 'America/El_Salvador'),?,?,1)
      `, [id, userId, total])

    products.forEach(async (product) => {
      await pool.query('INSERT INTO detalle_pedido (pedido_id, producto_id,cantidad) VALUES (?,?,?)', [id, product.id, product.quantity])
    })
    res.status(200).json({ message: 'ok' })
  }

  if (req.method === 'GET') {
    const { id } = req.query
    const [result] = await pool.query(`SELECT usuarios.nombre, usuarios.apellido, usuarios.email, usuarios.direccion, productos.nombre AS nombre_producto, productos.url, productos.precio, detalle_pedido.cantidad, detalle_pedido.cantidad * productos.precio AS total,
    pedidos.estado_pedido
    FROM productos
    INNER JOIN detalle_pedido ON productos.id = detalle_pedido.producto_id
    INNER JOIN pedidos ON detalle_pedido.pedido_id = pedidos.id
    INNER JOIN usuarios ON pedidos.id_usuario = usuarios.id
    WHERE detalle_pedido.pedido_id = ?
    `, [id])

    res.status(200).json(result)
  }
}
