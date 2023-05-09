import connection from '@/services/connection/connection'

export default async function handler (req, res) {
  const conn = await connection()

  try {
    if (req.method === 'GET') {
      const [rows] = await conn.execute('Select review.nombre, review.valoracion, review.feedback as comentario, productos.nombre as producto from review inner join productos on review.id_producto = productos.id')

      res.status(200).json(rows)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  } finally {
    conn.close()
  }
}
