import Layout from '@/components/admin/Layout'
import DashboardStats from '@/components/admin/dashboard/Stats'
import TopBar from '@/components/admin/dashboard/TopBar'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import { useAdmin } from '@/hooks/useAdmin'
import { useEffect } from 'react'
import LineChart from '@/components/admin/dashboard/LineChart'
import BarChart from '@/components/admin/dashboard/BarChart'

const statsData = [
  { title: 'Clientes', value: '34.7k', icon: <UserGroupIcon className='w-8 h-8' />, description: '↗︎ 2300 (22%)' },
  { title: 'Ventas Totales', value: '$34,545', icon: <CreditCardIcon className='w-8 h-8' />, description: 'Este mes' },
  { title: 'Pedidos', value: '450', icon: <CircleStackIcon className='w-8 h-8' />, description: '' },
  { title: 'Usuarios', value: '5.6k', icon: <UsersIcon className='w-8 h-8' />, description: '↙ 300 (18%)' }
]

export default function DashboardSales () {
  const { setPageTitle } = useAdmin()
  useEffect(() => {
    setPageTitle('Dashboard')
  }, [])
  return (
    <Layout>
      <TopBar />
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6'>
        {
                    statsData.map((d, k) => {
                      return (
                        <DashboardStats key={k} {...d} colorIndex={k} />
                      )
                    })
                }
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className='grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6'>
        <LineChart />
        <BarChart />
      </div>

    </Layout>

  )
}
