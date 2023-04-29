import connection from '@/services/connection/connection';

/*
	-- nota
	GET - envia una query params
	POST - envia un body 
	DELETE - envia un body data
	
 */

// -- requests handler
export default async function handler (req, res) {
	const conn = await connection();
	
	try{
		if(req.method == 'GET'){
			const [ rows, fields ] = await conn.execute('SELECT * FROM categorias', []);
			res.status(200).json(rows);
		}else if(req.method == 'POST'){
			await conn.execute('INSERT INTO categorias(nombre) VALUES(?)', [req.body.nombre]);
			const [ rows, fields ] = await conn.execute('SELECT * FROM categorias', []);
			res.status(200).json(rows);
		}else if(req.method == 'PUT'){
			await conn.execute('UPDATE categorias SET nombre=? WHERE id=?', [req.body.nombre, req.body.id]);
			const [ rows, fields ] = await conn.execute('SELECT * FROM categorias', []);
			res.status(200).json(rows);
		}else if(req.method == 'DELETE'){
			const [ rows, fields ] = await conn.execute('DELETE FROM categorias WHERE id=?', [req.body.id]);
			res.status(200).send();
		}
		
	}catch(error){
		console.log(error);
	}finally{
		conn.close();
	}
}
