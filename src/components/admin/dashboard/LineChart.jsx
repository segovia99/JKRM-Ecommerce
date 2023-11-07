import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import TitleCard from '../Cards/TitleCard'
import { useState, useEffect } from 'react'

import axios from 'axios'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

function LineChart () {
  const [data, setData] = useState({})
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  const loadData = async () => {
    const response = await axios.get('/api/stats/sales')
    setData(response.data)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <TitleCard title='Ventas Mensuales'>

      {
      Object.keys(data).length > 0 &&
        <Line data={data} options={options} />
     }

    </TitleCard>
  )
}

export default LineChart
