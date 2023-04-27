import connection from '@/services/connection/connection';

export default async function handler (req, res) {
	try{
		if (req.method == 'POST') {
			const conn = await connection();
			const [rows, fields] = await conn.execute('UPDATE productos SET nombre=?, descripcion=?, precio=?, cantidad=? WHERE id=?', [req.body.nombre, req.body.desc, req.body.precio, req.body.cantidad, req.body.id]);
			conn.close();
			res.status(200).send('ga');
		}
	}catch(error){
		console.log(error);
	}
}
