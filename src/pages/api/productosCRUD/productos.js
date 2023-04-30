import connection from '@/services/connection/connection'

export default async function handler (req, res) {
  const conn = await connection()

  try {
    if (req.method === 'GET') {
      if (req.query.first == 1) {
				const [rows] = await conn.execute('select productos.id as id, result.nombre as categoria, productos.nombre as nombre, productos.descripcion as descripcion, productos.precio as precio, productos.cantidad as cantidad, productos.url as url, productos.marca as marca, limite from (select id as id_cat, nombre, count(id) as limite from categorias group by id limit 1) as result inner join productos on productos.id_categorias=result.id_cat', [])
        res.status(200).json(rows)
      } else if (req.query.first == 0) {
        const [rows] = await conn.execute('SELECT * FROM productos WHERE id_categorias=?', [req.query.idCategoria])
        res.status(200).json(rows)
      }
    } else if (req.method === 'POST') {
      await conn.execute('INSERT INTO productos(id_categorias, nombre, descripcion, precio, cantidad, url, marca) VALUES(?, ?, ?, ?, ?, ?, ?)', [req.body.idCategoria, req.body.nombre, req.body.descripcion, req.body.precio, req.body.cantidad, req.body.url, req.body.marca])
      const [rows] = await conn.execute('SELECT * FROM productos WHERE id_categorias=?', [req.body.idCategoria])
      res.status(200).json(rows)
    } else if (req.method === 'PUT') {
      await conn.execute('UPDATE productos SET nombre=?, descripcion=?, precio=?, cantidad=?, url=?, marca=? WHERE id=?', [req.body.nombre, req.body.descripcion, req.body.precio, req.body.cantidad, req.body.url, req.body.marca, req.body.id])
      const [rows] = await conn.execute('SELECT * FROM productos WHERE id_categorias=?', [req.body.idCategoria])
      res.status(200).json(rows)
    } else if (req.method === 'DELETE') {
      await conn.execute('DELETE FROM productos WHERE id=?', [req.body.id])
      res.status(200).send()
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  } finally {
    conn.close()
  }
}
