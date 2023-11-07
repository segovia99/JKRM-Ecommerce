import { pool } from '@/db/db'

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const [result] = await pool.query(`
    SELECT
    DATE_FORMAT(fecha_pedido, '%Y-%m') AS mes,
    SUM(total) AS ventas_por_mes,
    DATE_FORMAT(fecha_pedido, '%M') AS nombre_mes
    FROM
    pedidos
    GROUP BY
    mes, nombre_mes
    ORDER BY
    mes;
`)

    const labels = result.map(row => row.nombre_mes)

    const sales = result.map(row => parseFloat(row.ventas_por_mes))

    const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Ventas',
          data: sales,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        }
      ]
    }

    res.status(200).json(data)
  }
}
