/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TruckIcon from '@heroicons/react/24/outline/TruckIcon'
import ArchiveBoxIcon from '@heroicons/react/24/outline/ArchiveBoxIcon'
import ListBulletIcon from '@heroicons/react/24/outline/ListBulletIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'

const iconClasses = 'h-6 w-6'

export const Routes = [

  {
    path: '/admin/dashboard',
    icon: <Squares2X2Icon className={iconClasses} />,
    name: 'Dashboard'
  },
  {
    path: '/admin/usuarios', // url
    icon: <UserIcon className={iconClasses} />, // icon component
    name: 'Usuarios' // name that appear in Sidebar
  },
  {
    path: '/admin/pedidos', // url
    icon: <TruckIcon className={iconClasses} />, // icon component
    name: 'Pedidos' // name that appear in Sidebar
  },
  {
    path: '/admin', // url
    icon: <ArchiveBoxIcon className={iconClasses} />, // icon component
    name: 'Inventario' // name that appear in Sidebar
  },
  {
    path: '/admin/categorias', // url
    icon: <ListBulletIcon className={iconClasses} />, // icon component
    name: 'Categorias' // name that appear in Sidebar
  }
]
