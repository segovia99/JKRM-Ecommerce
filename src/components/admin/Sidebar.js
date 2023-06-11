import Link from 'next/link'
import Avatar from '../Avatar'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'

export default function Sidebar ({ selection }) {
  return (
    <>

      <nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 '>
        <div className='px-3 py-1 lg:px-5 lg:pl-3'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-start'>
              <button data-drawer-target='logo-sidebar' data-drawer-toggle='logo-sidebar' aria-controls='logo-sidebar' type='button' className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 '>
                <span className='sr-only'>Open sidebar</span>
                <svg className='w-6 h-6' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path clipRule='evenodd' fillRule='evenodd' d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z' />
                </svg>
              </button>
              <Link href='/dashboard' className='flex ml-2 md:mr-24'>
                <img src='/logo3.png' className=' object-contain' alt='Logo' />
              </Link>
            </div>
            <div className='flex items-center'>
              <div className='flex items-center ml-3'>
                <div>
                  <button type='button' className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 ' aria-expanded='false' data-dropdown-toggle='dropdown-user'>
                    <span className='sr-only'>Open user menu</span>
                    <Avatar />
                  </button>
                </div>
                <div className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow' id='dropdown-user'>
                  <div className='px-4 py-3' role='none'>
                    <p className='text-sm text-gray-900' role='none'>
                      Neil Sims
                    </p>
                    <p className='text-sm font-medium text-gray-900 truncate ' role='none'>
                      neil.sims@gmail.com
                    </p>
                  </div>
                  <ul className='py-1' role='none'>
                    <li>
                      <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>Dashboard</a>
                    </li>
                    <li>
                      <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ' role='menuitem'>Settings</a>
                    </li>
                    <li>
                      <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>Earnings</a>
                    </li>
                    <li>
                      <a href='#' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100' role='menuitem'>Sign out</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside id='logo-sidebar' className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0' aria-label='Sidebar'>
        <div className='h-full px-3 pb-4 overflow-y-auto bg-white'>
          <ul className='space-y-2 font-medium'>
            <li>
              <Link href='/admin/dashboard' className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 '>
                <svg aria-hidden='true' className='w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z' /><path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z' /></svg>
                <span className={(selection === 'dashboard') ? 'ml-3 text-primary' : 'ml-3'}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href='/admin/' className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 '>
                <svg aria-hidden='true' className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z' clipRule='evenodd' /></svg>
                <span className={(selection === 'productos') ? 'ml-3 text-primary' : 'ml-3'}>Productos</span>
              </Link>
            </li>
            <li>
              <Link href='/admin/categorias' className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 '>
                <svg aria-hidden='true' className='w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z' /><path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z' /></svg>
                <span className={(selection === 'categorias') ? 'ml-3 text-primary' : 'ml-3'}>Categorias</span>
              </Link>
            </li>
            <li>
              <Link href='/admin/pedidos' className='flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 '>
                <InboxArrowDownIcon className='w-6 h-6 text-gray-500' />
                <span className={(selection === 'pedidos') ? 'ml-3 text-primary' : 'ml-3'}>Pedidos</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

    </>
  )
}
