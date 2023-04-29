import Layout from '@/components/admin/Layout';
import Image from 'next/image';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';

function queryAttr(element, attribute, query){
  return document.querySelector(`${element}[${attribute}="${query}"]`);
}

export default function Productos ({ categorias, productos }) {
  let idCategorias = 1;
  const [ categories, setCategories ] = useState([]);
  const [ products, setProducts ] = useState([]);
  const [ tab, setTab ] = useState(1);
  
  useEffect(() => {
    (async () => {
      const resCategories = await axios.get('/api/categoriasCRUD/categorias');
      const resProducts = await axios.get('/api/productosCRUD/productos', { params:{ first:1 } });
      setCategories(resCategories.data);
      setProducts(resProducts.data);
    })();
  }, []);

  const modifyProduct = (id, nombre, descripcion, precio, cantidad, url) => {
    queryAttr('input', 'name', 'idProducto').value = id;
    queryAttr('input', 'name', 'nombreProducto').value = nombre;
    queryAttr('input', 'name', 'descripcionProducto').value = descripcion;
    queryAttr('input', 'name', 'precioProducto').value = precio;
    queryAttr('input', 'name', 'cantidadProducto').value = cantidad;
    queryAttr('input', 'name', 'imgProducto').value = url;
  };
  
  const insertProduct = async (idCategoria, nombre, descripcion, precio, cantidad, url) => {
    let temp = { idCategoria, nombre, descripcion, precio, cantidad, url };
    const resProducts = await axios.post('/api/productosCRUD/productos', temp);
    setProducts(resProducts.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete('/api/productosCRUD/productos', { data: {id} });
    setProducts(products.filter(product => product.id != id));
  };

  const updateProduct = async (id_categoria, id, nombre, descripcion, precio, cantidad, url) => {
    let temp = { id_categoria, id, nombre, descripcion, precio, cantidad, url };
    const resProducts = await axios.put('/api/productosCRUD/productos', temp);
    setProducts(resProducts.data);
  };

  const filterProduct = async (id_categoria) => {
    console.log(id_categoria);
    const resProducts = await axios.get('/api/productosCRUD/productos', { params:{ first:0, id_categoria } });
    setProducts(resProducts.data);
  };

  const previewProduct = (url) => {
    queryAttr('div', 'id', 'imgPreview').className = 'visible w-[60%] h-[75vh] mt-[100px] bg-white absolute shadow-md flex flex-col justify-start items-start';
    document.getElementById('image').setAttribute('src', url);
  };

  const closeProduct = () => {
    queryAttr('div', 'id', 'imgPreview').className = 'hidden w-[60%] h-[75vh] mt-[100px] bg-white absolute shadow-md flex flex-col justify-start items-start';
  };

	return (
		<Layout>
      <div id="imgPreview" className="absolute hidden w-[60%] h-[75vh] mt-[100px] bg-white shadow-md flex flex-col justify-start items-start">
        <div className="w-[100%]">
          <button onClick={ closeProduct } className="m-[2%] float-right hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">close</button>
        </div>
        <div className="w-[50vw] h-[50vh]">
          <img src="" id="image" className='w-[100%] max-w-[400px]'></img>
        </div>
      </div>
			<div className="w-[100%] h-[85vh] mt-[56px]">
				<div className="w-[100%] h-[58%] overflow-y-scroll my-[10px] border-b border-gray-200">
					<table className="w-[100%] bg-white">
						<thead className="sticky top-0 bg-[#db1436] text-white">
							<tr className="h-8">
								<th>id</th>
								<th>categoria</th>
								<th>nombre</th>
								<th>descripcion</th>
								<th>precio</th>
								<th>cantidad</th>
                <th>imagen</th>
								<th>op. 1</th>
								<th>op. 2</th>
							</tr>
						</thead>
						<tbody>
							{
								products.map(item => {
									idCategorias++;

									if (idCategorias % 2 == 0) {
										return (
											<tr key={item.id} className="h-8 bg-[#f2f2f2]">
												<td>{item.id}</td>
												<td>{item.categoria}</td>
												<td>{item.nombre}</td>
												<td>{item.descripcion}</td>
												<td>{item.precio}</td>
												<td>{item.cantidad}</td>
                        <td><a href={item.url} target="_blank" className="underline text-[#d97179]">imagen URL</a></td>
												<td><button onClick={() => deleteProduct(item.id)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">borrar</button></td>
												<td><button onClick={() => modifyProduct(
													item.id,
													item.nombre,
													item.descripcion,
													item.precio,
													item.cantidad,
                          item.url
												)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">modificar</button></td>
											</tr>
										);
									} else {
										return (
											<tr key={item.id} className="h-8">
												<td>{item.id}</td>
												<td>{item.categoria}</td>
												<td>{item.nombre}</td>
												<td>{item.descripcion}</td>
												<td>{item.precio}</td>
												<td>{item.cantidad}</td>
                        <td><a href={item.url} target="_blank" className="underline text-[#d97179]">imagen URL</a></td>
												<td><button onClick={() => deleteProduct(item.id)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">borrar</button></td>
												<td><button onClick={() => modifyProduct(
													item.id,
													item.nombre,
													item.descripcion,
													item.precio,
													item.cantidad,
                          item.url
												)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">modificar</button></td>
											</tr>
										);
									}
								})
							}
						</tbody>
					</table>
				</div>
				<div className="w-[100%] h-[30%] bg-white border-b border-gray-200 flex flex-col justify-center space-y-[16px]">
					<div className="flex flex-row">
						<button onClick={() => insertProduct(
							queryAttr('select', 'id', 'sel').value,
							queryAttr('input', 'name', 'nombreProducto').value,
							queryAttr('input', 'name', 'descripcionProducto').value,
							queryAttr('input', 'name', 'precioProducto').value,
							queryAttr('input', 'name', 'cantidadProducto').value,
              queryAttr('input', 'name', 'imgProducto').value
						)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">insertar</button>
						<button onClick={() => updateProduct(
							queryAttr('select', 'id', 'sel').value,
							queryAttr('input', 'name', 'idProducto').value,
							queryAttr('input', 'name', 'nombreProducto').value,
							queryAttr('input', 'name', 'descripcionProducto').value,
							queryAttr('input', 'name', 'precioProducto').value,
							queryAttr('input', 'name', 'cantidadProducto').value,
              queryAttr('input', 'name', 'imgProducto').value
						)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">guardar</button>
						<div className="ml-[16px]">
							<label>categoria </label>
							<select id="sel" title="Si no se muestra nada cambia de categoria" onChange={() => filterProduct(
								queryAttr('select', 'id', 'sel').value
							)} className="border border-gray-200">
								{
									categories.map(item => (<option key={item.id} value={item.id}>{item.nombre}</option>))
								}
							</select>
						</div>
					</div>
					<div id="productos" className="flex flex-row flex-wrap space-x-[10px] space-y-[10px] place-content-start items-center">
						<div className="mt-[10px] ml-[10px]">
							<label className="float-left w-[100px]">id </label>
							<input name="ad" className="hidden" type="text" disabled></input>
							<input name="ag" className="hidden" type="text" disabled></input>
							<input name="idProducto" className="border border-gray-200 bg-gray-200" type="text" disabled></input>
						</div>
						<div>
							<label className="float-left w-[100px]">nombre </label>
							<input name="af" className="hidden" type="text" disabled></input>
							<input name="a" className="hidden" type="text" disabled></input>
							<input name="nombreProducto" className="border border-gray-200" type="text"></input>
						</div>
						<div>
							<label className="float-left w-[100px]">descripcion </label>
							<input name="descripcionProducto" className="border border-gray-200" type="text"></input>
						</div>
						<div>
							<label className="float-left w-[100px]">precio </label>
							<input name="precioProducto" className="border border-gray-200" type="text"/>
						</div>
						<div>
							<label className="float-left w-[100px]">cantidad </label>
							<input name="cantidadProducto" className="border border-gray-200" type="text"/>
						</div>
            <div>
							<label className="float-left w-[100px]">imagen </label>
							<input name="imgProducto" className="border border-gray-200" type="text"/>
              <button onClick={() => previewProduct(queryAttr('input', 'name', 'imgProducto').value) } className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">preview</button>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
}
