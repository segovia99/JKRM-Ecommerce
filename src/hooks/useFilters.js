import { FiltersContext } from '@/context/filters'
import { useContext } from 'react'

// Función para mezclar un array de forma aleatoria (Fisher-Yates)
function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export function useFilters () {
  const { filters, setFilters } = useContext(FiltersContext)

  const filterProducts = (products) => {
    // Filtrar productos por categoría
    const filteredProducts = products.filter((product) => {
      return (
        filters.categories.includes('all') ||
        filters.categories.includes(product.id_categorias.toString())
      )
    })

    // Mezclar aleatoriamente los productos filtrados
    const shuffledProducts = shuffleArray(filteredProducts)

    return shuffledProducts
  }

  return { filters, filterProducts, setFilters }
}
