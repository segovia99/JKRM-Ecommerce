
import { useState, createContext } from 'react'

export const AdminContext = createContext()

export function AdminProvider ({ children }) {
  const [pageTitle, setPageTitle] = useState('')
  return (
    <AdminContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </AdminContext.Provider>
  )
}
