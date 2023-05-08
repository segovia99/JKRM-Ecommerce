import connection from '@/services/connection/connection'

export default async function handler (req, res) {
  const conn = await connection()

  try {
    if (req.method == 'GET') {
      const [rows] = await conn.execute('select productos.nombre, count(review.id) as conteo from review inner join productos on review.id_producto=productos.id where (review.fecha between ? and ?) group by productos.nombre limit ?', [req.query.initialDate, req.query.finalDate, req.query.elements])

      res.status(200).json(rows)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  } finally {
    conn.close()
  }
}
