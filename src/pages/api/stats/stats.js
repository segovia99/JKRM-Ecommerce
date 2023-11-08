import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [ventas] = await pool.query(`
    SELECT
    SUM(total) AS ventas_totales_mes_actual
    FROM
    pedidos
    WHERE
    DATE_FORMAT(fecha_pedido, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m');
`)

    const [clientes] = await pool.query('SELECT COUNT(*) AS cantidad_total_clientes FROM usuarios WHERE rol=2;')
    const [usuarios] = await pool.query('SELECT COUNT(*) AS cantidad_total_usuarios FROM usuarios WHERE rol=1 OR rol=3 OR rol=4;')
    const [pedidos] = await pool.query('SELECT COUNT(*) AS cantidad_total_pedidos FROM pedidos WHERE DATE_FORMAT(fecha_pedido, \'%Y-%m\') = DATE_FORMAT(CURRENT_DATE, \'%Y-%m\');')
    const data = {
      ventas: ventas[0].ventas_totales_mes_actual,
      clientes: clientes[0].cantidad_total_clientes,
      usuarios: usuarios[0].cantidad_total_usuarios,
      pedidos: pedidos[0].cantidad_total_pedidos
    }

    res.status(200).json(data)
  }
}
