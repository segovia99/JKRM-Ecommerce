import Layout from '@/components/admin/Layout';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';

export default function dashboard ({ categorias, productos }) {
  // definicion de cookie de memoria
  const [ cookies, setCookie, removeCookie ] = useCookies('tab', 0);
  const [ tab, setTab ] = useState(0);
  const [ productosClient, setProductosClient ] = useState(productos);

  // memoria de la tabla que se edita
  useEffect(() => (tab != cookies.tab)? setTab(cookies.tab):setTab(tab), [cookies]);
	let idCategorias = 1; // contador de paridad para alternar colores de tablas

  // request =============== CATEGORIAS ===============
	const deleteCategory = async (id) => {
		const res = await axios.post('http://localhost:3000/api/categoriasCRUD/delete', {view:1, id});
		Router.reload();
	};

  const updateCategory = async (item) => {
    document.querySelector('input[name="idCategoria"]').value = item.id;
    document.querySelector('input[name="nombreCategoria"]').value = item.nombre;
  };

  const insertCategory = async (nombre) => {
    const res = await axios.post('http://localhost:3000/api/categoriasCRUD/insert', {view:1, nombre});
    Router.reload();
  };

  const saveCategory = async (id, nombre) => {
    const res = await axios.post('http://localhost:3000/api/categoriasCRUD/update', {view:1, id, nombre});
    Router.reload();
  };

  // =============== PRODUCTOS ===============
  const selectProduct = async (id) => {
    const res = await axios.post('http://localhost:3000/api/productosCRUD/select', {view:0, id});
    console.log(res.data);
    setProductosClient(res.data);
  };

  const deleteProduct = async (id) => {
    console.log('delete');
    const res = await axios.post('http://localhost:3000/api/productosCRUD/delete', {view:0, id});
    Router.reload();
  };

  const insertProduct = async (idCat, nombre, desc, precio, cantidad) => {
    const res = await axios.post('http://localhost:3000/api/productosCRUD/insert', {view:0, idCat, nombre, desc, precio, cantidad});
    Router.reload();
  };

  const updateProduct = (id, nombre, desc, precio, cantidad) => {
    document.querySelector('input[name="idProducto"]').value = id;
    document.querySelector('input[name="nombreProducto"]').value = nombre;
    document.querySelector('input[name="descripcionProducto"]').value = desc;
    document.querySelector('input[name="precioProducto"]').value = precio;
    document.querySelector('input[name="cantidadProducto"]').value = cantidad;
  };

  const saveProduct = async (id, nombre, desc, precio, cantidad) => {
    const res = await axios.post('http://localhost:3000/api/productosCRUD/update', {id, nombre, desc, precio, cantidad});
    Router.reload();
  };
  
  // cambiador de tablas
  const changeCategory = () =>  { setCookie('tab', 1); setTab(1); };
  const changeProduct = () =>  { setCookie('tab', 0); setTab(0); };

  // renderizado condicional
  if(tab){
		return (
			<Layout>
				<div className="w-[100%] h-[85vh] mt-[56px]">
          <div className="w-[100%] h-[10%] bg-white flex flex-row items-center space-x-[10px] border-b border-gray-200">
            <button onClick={changeCategory} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">Categorias</button>
            <button onClick={changeProduct} className="hover:bg-black text-white bg-gray-200 p-[4px] rounded-md">Productos</button>
          </div>
          <div className="w-[100%] h-[68%] overflow-y-scroll my-[10px] border-b border-gray-200">
            <table className="w-[100%] bg-white">
              <thead className="sticky top-0 bg-[#db1436] text-white">
                <tr className="h-8">
                  <th>id</th>
                  <th>categoria</th>
                  <th>op. 1</th>
                  <th>op. 2</th>
                </tr>
              </thead>
              <tbody>
                {
                  categorias.map(item => {
                    idCategorias++;

										if (idCategorias % 2 == 0) {
											return (
												<tr key={item.id} className="h-8 bg-[#f2f2f2]">
													<td>{item.id}</td>
													<td>{item.nombre}</td>
													<td><button onClick={() => deleteCategory(item.id)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">borrar</button></td>
													<td><button onClick={() => updateCategory(item)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">modificar</button></td>
												</tr>
											);
										} else {
											return (
												<tr key={item.id} className="h-8">
													<td>{item.id}</td>
													<td>{item.nombre}</td>
													<td><button onClick={() => deleteCategory(item.id)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">borrar</button></td>
													<td><button onClick={() => updateCategory(item)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">modificar</button></td>
												</tr>
											);
										}
									})
                }
              </tbody>
            </table>
          </div>
          <div className="w-[100%] h-[20%] bg-white border-b border-gray-200 flex flex-col justify-center space-y-[16px]">
			      <div>
              <button onClick={() => insertCategory(document.querySelector('input[name="nombreCategoria"]').value)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">insertar</button>
              <button onClick={() => saveCategory(document.querySelector('input[name="idCategoria"]').value, document.querySelector('input[name="nombreCategoria"]').value)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">guardar</button>
            </div>
            <div className="flex flex-row space-x-[10px] wrap">
              <div className="ml-[16px]">
                <label>id </label>
                <input name="idCategoria" className="border border-gray-200 bg-gray-200" type="text" disabled></input>
              </div>
              <div>
                <label>nombre </label>
                <input name="nombreCategoria" className="border border-gray-200" type="text"></input>
              </div>
            </div>
          </div>
			  </div>
			</Layout>
		);
	} else {
		return (
			<Layout>
				<div className="w-[100%] h-[85vh] mt-[56px]">
          <div className="w-[100%] h-[10%] bg-white flex flex-row items-center space-x-[10px] border-b border-gray-200">
            <button onClick={changeCategory} className="hover:bg-black text-white bg-gray-200 p-[4px] rounded-md mx-[10px]">Categorias</button>
            <button onClick={changeProduct} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md">Productos</button>
          </div>
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
                  <th>op. 1</th>
                  <th>op. 2</th>
                </tr>
              </thead>
              <tbody>
                {
                  productosClient.map(item => {
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
													<td><button onClick={() => deleteProduct(item.id)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">borrar</button></td>
													<td><button onClick={() => updateProduct(item.id, item.nombre, item.descripcion, item.precio, item.cantidad)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">modificar</button></td>
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
													<td><button onClick={() => deleteProduct(item.id)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">borrar</button></td>
													<td><button onClick={() => updateProduct(item.id, item.nombre, item.descripcion, item.precio, item.cantidad)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">modificar</button></td>
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
              <button onClick={() => insertProduct(document.getElementById('sel').value, document.querySelector('input[name="nombreProducto"]').value, document.querySelector('input[name="descripcionProducto"]').value, document.querySelector('input[name="precioProducto"]').value, document.querySelector('input[name="cantidadProducto"]').value)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">insertar</button>
              <button onClick={() => saveProduct(document.querySelector('input[name="idProducto"]').value, document.querySelector('input[name="nombreProducto"]').value, document.querySelector('input[name="descripcionProducto"]').value, document.querySelector('input[name="precioProducto"]').value, document.querySelector('input[name="cantidadProducto"]').value)} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">guardar</button>
              <div className="ml-[16px]">
                <label>categoria </label>
                <select id="sel" onChange={()=> selectProduct(document.getElementById("sel").value)} className="border border-gray-200">
                  {
                    categorias.map(item => (<option key={item.id} value={item.id}>{item.nombre}</option>))
                  }
                </select>
              </div>
            </div>
            <div className="flex flex-row flex-wrap space-x-[10px] space-y-[10px] place-content-start items-center">
              <div className="mt-[10px] ml-[10px]">
                <label className="float-left w-[100px]">id </label>
                <input name="idProducto" className="border border-gray-200 bg-gray-200" type="text" disabled></input>
              </div>
              <div>
                <label className="float-left w-[100px]">nombre </label>
                <input name="nombreProducto" className="border border-gray-200" type="text"></input>
              </div>
              <div>
                <label className="float-left w-[100px]">descripcion </label>
                <input name="descripcionProducto" className="border border-gray-200" type="text"></input>
              </div>
              <div>
                <label className="float-left w-[100px]">precio </label>
                <input name="precioProducto" className="border border-gray-200" type="text"></input>
              </div>
              <div>
                <label className="float-left w-[100px]">cantidad </label>
                <input name="cantidadProducto" className="border border-gray-200" type="text"></input>
              </div>
            </div>
          </div>
			  </div>
			</Layout>
		);
	}
}

export async function getServerSideProps () {
	try{
		const resCategorias = await axios.post('http://localhost:3000/api/categoriasCRUD/select');
    const resProductos = await axios.post('http://localhost:3000/api/productosCRUD/select', {first:true});
		return {
			props:{
				categorias:resCategorias.data,
        productos:resProductos.data
			}
		}
	}catch(error){
		console.log(error);
	}
}




