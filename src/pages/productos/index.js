import Layout from '@/components/admin/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Router from 'next/router';

export default function dashboard ({ categorias }) {
  const [ tab, setTab ] = useState(1);
	let idCategorias = 1;
  // requests
  // =============== CATEGORIAS ===============
	const deleteCategory = async (id) => {
		const res = await axios.post('http://localhost:3000/api/productosCRUD/delete', {view:1, id});
		Router.reload();
	};

  const updateCategory = async (item) => {
    document.querySelector('input[name="idCategoria"]').value = item.id;
    document.querySelector('input[name="nombreCategoria"]').value = item.nombre;
  };

  const insertCategory = async (nombre) => {
    const res = await axios.post('http://localhost:3000/api/productosCRUD/insert', {view:1, nombre});
    Router.reload();
  };

  const saveCategory = async (id, nombre) => {
    const res = await axios.post('http://localhost:3000/api/productosCRUD/update', {view:1, id, nombre});
    Router.reload();
  };

  // =============== PRODUCTOS ===============
  
  // handler de evento
  const changeCategory = () =>  setTab(1);
  const changeProduct = () =>  setTab(0);

  // cambio de productos a categorias
  if(tab){
		return (
			<Layout>
				<div className="w-[100%] h-[85vh] mt-[56px]">
          <div className="w-[100%] h-[10%] bg-white flex flex-row items-center space-x-[10px] border-b border-gray-200">
            <button onClick={changeCategory} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px]">Categorias</button>
            <button onClick={changeProduct} className="hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md">Productos</button>
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
        <div>
          <div></div>
          <div></div>
        </div>
			</Layout>
		);
	}
}

export async function getServerSideProps () {
	try{
		const res = await axios.post('http://localhost:3000/api/productosCRUD/select');
		return {
			props:{
				categorias:res.data
			}
		}
	}catch(error){
		console.log(error);
	}
}




