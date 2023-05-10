import Layout from '@/components/admin/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

function queryAttr (element, attribute, query) {
  return document.querySelector(`${element}[${attribute}="${query}"]`)
}

export default function Categorias () {
  const colors = [
    '#9cf7b4',
    '#f7eb9c',
    '#f7a29c',
    '#c5f79c',
    '#9cf7dd',
    '#9ceef7',
    '#9cb9f7',
    '#ce9cf7',
    '#f79cce',
    '#f79c9c'
  ]

  const [values, setValues] = useState({
    labels: [0],
    datasets: [{
      label: ['void'],
      data: [0],
      backgroundColor: colors
    }]
  })
  const [filterSelection, setFilterSelection] = useState('categorias')
  const [review, setReview] = useState({})
  const [comments, setComments] = useState([])

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/dashboardQuerys/valoraciones')
      setComments(res.data)
    })()
  }, [])

  const query = async () => {
    const initialDate = queryAttr('input', 'id', 'initialDateInput').value
    const finalDate = queryAttr('input', 'id', 'finalDateInput').value
    const filter = queryAttr('select', 'id', 'filter').value
    const elements = queryAttr('select', 'id', 'elements').value
    console.log(elements)
    setFilterSelection(filter)

    if (filter === 'categorias') {
      const res = await axios.get('/api/dashboardQuerys/categorias', {
        params: {
          initialDate,
          finalDate,
          filter,
          elements
        }
      })

      const resReview = await axios.get('/api/dashboardQuerys/categoriasReview', {
        params: {
          initialDate,
          finalDate,
          filter,
          elements
        }
      })

      setValues({
        labels: res.data.map(item => item.nombre),
        datasets: [{
          label: filter,
          data: res.data.map(item => item.conteo),
          backgroundColor: colors
        }]
      })
      console.log(resReview.data[0])

      if (resReview.data[0]) {
        setReview(resReview.data[0])
      } else {
        setReview({ nombre: 'empty', conteo: 0, valoracion: 0.00 })
      }
    } else if (filter === 'productos') {
      const res = await axios.get('/api/dashboardQuerys/productos', {
        params: {
          initialDate,
          finalDate,
          filter,
          elements
        }
      })

      setValues({
        labels: res.data.map(item => item.nombre),
        datasets: [{
          label: filter,
          data: res.data.map(item => item.conteo),
          backgroundColor: colors
        }]
      })

      const resReview = await axios.get('/api/dashboardQuerys/productosReview', {
        params: {
          initialDate,
          finalDate,
          filter,
          elements
        }
      })

      if (resReview.data[0]) {
        setReview(resReview.data[0])
      } else {
        setReview({ nombre: 'empty', conteo: 0, valoracion: 0.00 })
      }
    }
  }

  return (
    <Layout selection='dashboard'>
      <div className='w-[100%] h-[85vh] mt-[56px]'>
        <div className='w-[100%] h-[10%] my-[10px] border-b border-gray-200 bg-white'>
          <label className='px-2'>Perdiodo inicial</label>
          <input id='initialDateInput' type='date' />
          <label className='px-2'>Perdiodo inicial</label>
          <input id='finalDateInput' type='date' />
          <label className='px-2'>Filtro</label>
          <select id='filter'>
            <option value='categorias'>categorias</option>
            <option value='productos'>productos</option>
          </select>
          <label className='px-2'>Elementos</label>
          <select id='elements'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
          <button onClick={query} className='hover:bg-black text-white bg-[#db1436] p-[4px] rounded-md mx-[10px] my-2'>Buscar</button>
        </div>
        <div className='w-[100%] h-[60%] my-[10px] border-b border-gray-200 bg-white flex flex-row justify-center'>
          <div className='h-[100%] w-[60%] bg-white'>
            <Bar data={values} redraw />
          </div>
          <div className='h-[90%] w-[40%] bg-white flex flex-row justify-center'>
            <Pie data={values} />
          </div>
        </div>
        <div className='w-[100%] h-[20%] bg-white border-b border-gray-200 flex flex-col justify-center space-y-[16px]'>
          <div id='categorias' className='flex flex-row space-x-[10px] wrap'>
            <div className='ml-[16px]'>
              <label>{filterSelection} mejor vendido/a: </label>
              <input defaultValue='empty' value={review.nombre} />
            </div>
            <div>
              <label>{filterSelection} total vendido/a: </label>
              <input defaultValue={0} value={review.conteo} />
            </div>
            <div>
              <label>{filterSelection} media valorado/a: </label>
              <input defaultValue={0.00} value={review.valoracion} />
            </div>
          </div>
        </div>
      </div>
      <div>
        <table className='w-[100%]'>
          <thead>
            <tr className='bg-[#db1436] text-white border-lg'>
              <th className='p-[1%]'>cliente</th>
              <th className='p-[1%]'>producto</th>
              <th className='p-[1%]'>valoracion</th>
              <th className='p-[1%]'>comentario</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(item => (
              <tr key={item.id} className='text-center mt-[50px] bg-white border-b-gray'>
                <td className='mt-[4px]'>{item.nombre}</td>
                <td className='mt-[4px]'>{item.producto}</td>
                <td className='mt-[40px]'>{item.valoracion}</td>
                <td className='mt-[4px]'>{item.comentario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
