/** Icons are imported separatly to reduce build time */
import ArchiveBoxIcon from '@heroicons/react/24/outline/ArchiveBoxIcon'

const iconClasses = 'h-6 w-6'

export const RoutesI = [

  {
    path: '/inventory/inventario', // url
    icon: <ArchiveBoxIcon className={iconClasses} />, // icon component
    name: 'Inventario' // name that appear in Sidebar
  }
]
