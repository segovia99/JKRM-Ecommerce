import connection from '@/services/connection/connection'

export default async function handler (req, res) {
	const conn = await connection()

  try {
    if (req.method == 'GET') {
      const [rows] = await conn.execute('select usuarios.usuario as cliente, productos.nombre as producto, review.valoracion as valoracion, review.feedback as comentario from usuarios inner join review on usuarios.id=review.id_usuario inner join productos on productos.id=review.id_producto order by review.fecha desc');

      res.status(200).json(rows)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  } finally {
    conn.close()
  }
}
