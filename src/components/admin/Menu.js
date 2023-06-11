/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import StarIcon from '@heroicons/react/24/outline/StarIcon'
import TruckIcon from '@heroicons/react/24/outline/TruckIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'

const iconClasses = 'h-6 w-6'

export const Routes = [

  {
    path: '/admin/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard'
  },
  {
    path: '/admin', // url
    icon: <InboxArrowDownIcon className={iconClasses} />, // icon component
    name: 'Productos' // name that appear in Sidebar
  },
  {
    path: '/admin/categorias', // url
    icon: <CurrencyDollarIcon className={iconClasses} />, // icon component
    name: 'Categorias' // name that appear in Sidebar
  },
  {
    path: '/admin/pedidos', // url
    icon: <TruckIcon className={iconClasses} />, // icon component
    name: 'Pedidos' // name that appear in Sidebar
  },
  {
    path: '/', // url
    icon: <StarIcon className={iconClasses} />, // icon component
    name: 'Valoraciones' // name that appear in Sidebar
  }
]
