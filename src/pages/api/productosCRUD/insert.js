import connection from '@/services/connection/connection';

export default async function handler (req, res) {
	try{
		if (req.method == 'POST') {
			const conn = await connection();
			const [rows, fields] = await conn.execute('INSERT INTO productos(id_categorias, nombre, descripcion, precio, cantidad) VALUES(?, ?, ?, ?, ?)', [req.body.idCat, req.body.nombre, req.body.desc, req.body.precio, req.body.cantidad]);
			conn.close();
			res.status(200).json(rows);
		}
	}catch(error){
		console.log(error);
	}
}
