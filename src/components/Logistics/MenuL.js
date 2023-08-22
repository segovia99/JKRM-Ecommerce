/** Icons are imported separatly to reduce build time */
import TruckIcon from '@heroicons/react/24/outline/TruckIcon'

const iconClasses = 'h-6 w-6'

export const RoutesL = [

  {
    path: '/Logistics/pedidos', // url
    icon: <TruckIcon className={iconClasses} />, // icon component
    name: 'Pedidos' // name that appear in Sidebar
  }
]
