
import { useState, createContext, useRef } from 'react'

export const AdminContext = createContext()

export function AdminProvider ({ children }) {
  const [pageTitle, setPageTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [header, setHeader] = useState('')
  const [productosG, setProductosG] = useState([])
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    cantidad: '',
    url: '',
    marca: ''
  })
  const formikRef = useRef()
  const updateFieldValue = (key, value) => {
    // Usar setFieldValue en la función
    if (formikRef.current) {
      formikRef.current.setFieldValue(key, value)
    }
  }

  return (
    <AdminContext.Provider value={{ pageTitle, setPageTitle, isOpen, setIsOpen, header, setHeader, producto, setProducto, formikRef, updateFieldValue, isUpdate, setIsUpdate, productosG, setProductosG }}>
      {children}
    </AdminContext.Provider>
  )
}
