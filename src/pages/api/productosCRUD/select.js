import connection from '@/services/connection/connection';

export default async function handler (req, res) {
	try{
		if (req.method == 'POST') {
			const conn = await connection();

			if(req.body.first){
				const [rows, fields] = await conn.execute('select productos.id as id, result.nombre as categoria, productos.nombre as nombre, productos.descripcion as descripcion, productos.precio as precio, productos.cantidad as cantidad, limite from (select id as id_cat, nombre, count(id) as limite from categorias group by id limit 1) as result inner join productos on productos.id_categorias=result.id_cat', []);
				
				console.log(rows);
				conn.close();
				res.status(200).json(rows);
			}else{
				const [rows, fields] = await conn.execute('select productos.id as id, categorias.nombre as categoria, productos.nombre as nombre, productos.descripcion as descripcion, productos.precio as precio, productos.cantidad as cantidad from productos inner join categorias on productos.id_categorias=categorias.id where categorias.id=?', [req.body.id]);

				res.status(200).send(rows);
			}
		}
	}catch(error){
		console.log(error);
	}
}


