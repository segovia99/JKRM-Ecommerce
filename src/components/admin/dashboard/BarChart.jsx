import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import TitleCard from '../Cards/TitleCard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function BarChart () {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

  const data = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: labels.map(() => { return Math.random() * 1000 + 500 }),
        backgroundColor: 'rgba( 0, 255, 128)'
      },
      {
        label: 'Costos',
        data: labels.map(() => { return Math.random() * 1000 + 500 }),
        backgroundColor: 'rgba(53, 162, 235, 1)'
      },
      {
        label: 'Gastos',
        data: labels.map(() => { return Math.random() * 1000 + 500 }),
        backgroundColor: 'rgba(255, 99, 132, 1)'
      }
    ]
  }

  return (
    <TitleCard title='Resumen'>
      <Bar options={options} data={data} />
    </TitleCard>

  )
}

export default BarChart
