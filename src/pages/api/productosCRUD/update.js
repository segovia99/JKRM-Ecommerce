import connection from '@/services/connection/connection';

export default async function handler (req, res) {
	try{
		if (req.method == 'POST') {
			if(req.body.view){
				const conn = await connection();
				const [rows, fields] = await conn.execute('UPDATE categorias SET nombre=? WHERE ID=?', [req.body.nombre, req.body.id]);
				conn.close();
				res.status(200).json(rows);
			}else{
				const conn = await connection();
				const [rows, fields] = await conn.execute('SELECT * FROM categorias', []);
				conn.close();
				res.status(200).json(rows);
			}
		}
	}catch(error){
		console.log(error);
	}
}
