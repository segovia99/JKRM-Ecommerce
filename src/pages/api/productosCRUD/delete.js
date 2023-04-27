import connection from '@/services/connection/connection';

export default async function handler (req, res) {
	try{
		if (req.method == 'POST') {
			const conn = await connection();
			const [rows, fields] = await conn.execute('DELETE FROM productos WHERE id=?', [req.body.id]);
			conn.close();
			res.status(200).json(rows);
		}
	}catch(error){
		console.log(error);
	}
}
