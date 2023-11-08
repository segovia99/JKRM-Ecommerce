
import { useState, useEffect } from 'react'
import TitleCard from '../Cards/TitleCard'
import axios from 'axios'

function BarChart () {
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    const response = await axios.get('/api/stats/lowstock')
    setProducts(response.data)
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
    <TitleCard title='Productos con bajo stock'>
      <div className='overflow-x-auto w-full'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {
                  products.map((product, k) => {
                    return (
                      <tr key={k}>
                        <td>
                          <div className='flex items-center space-x-3'>
                            <div className='avatar'>
                              <div className='mask mask-squircle w-12 h-12'>
                                <img src={product.url} alt='Avatar' />
                              </div>
                            </div>
                            <div>
                              <div className='font-bold'>{product.nombre}</div>
                            </div>
                          </div>
                        </td>
                        <td>{product.cantidad}</td>
                      </tr>
                    )
                  })
                }
          </tbody>
        </table>
      </div>
    </TitleCard>

  )
}

export default BarChart
