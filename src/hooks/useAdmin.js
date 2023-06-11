import { AdminContext } from '@/context/admin'
import { useContext } from 'react'

export const useAdmin = () => {
  const context = useContext(AdminContext)

  if (context === undefined) {
    throw new Error('useAdmin must be used within a CartProvider')
  }

  return context
}
