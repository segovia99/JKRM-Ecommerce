import { useState, useEffect } from 'react'
import Layout from '@/components/admin/Layout'
import DashboardStats from '@/components/admin/dashboard/Stats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import { useAdmin } from '@/hooks/useAdmin'

import LineChart from '@/components/admin/dashboard/LineChart'
import BarChart from '@/components/admin/dashboard/BarChart'
import axios from 'axios'

export default function DashboardSales () {
  const [data, setData] = useState([])
  const { setPageTitle } = useAdmin()

  const getData = async () => {
    const response = await axios.get('/api/stats/stats')
    const { clientes, ventas, pedidos, usuarios } = response.data
    setData(
      [
        { title: 'Clientes', value: clientes, icon: <UserGroupIcon className='w-8 h-8' />, description: '' },
        { title: 'Ventas Totales', value: '$' + ventas, icon: <CreditCardIcon className='w-8 h-8' />, description: 'Este mes' },
        { title: 'Pedidos', value: pedidos, icon: <CircleStackIcon className='w-8 h-8' />, description: 'Este mes' },
        { title: 'Usuarios', value: usuarios, icon: <UsersIcon className='w-8 h-8' />, description: '' }
      ]
    )
  }
  useEffect(() => {
    setPageTitle('Dashboard')
    getData()
  }, [])
  return (
    <Layout>
      {/* <TopBar /> */}
      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className='grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6'>
        {
                    data.map((d, k) => {
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
