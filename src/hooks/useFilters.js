import { FiltersContext } from '@/context/filters'
import { useContext } from 'react'

export function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    return products.filter(product => {
      return (

        filters.category === 'all' || product.id_categorias === parseInt(filters.category)

      )
    })
  }

  return { filters, filterProducts, setFilters }
}
