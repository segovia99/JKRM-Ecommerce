import { useReducer, createContext, useEffect } from 'react'
import { cartReducer } from '../reducers/cart.js'

export const CartContext = createContext()

function useCartReducer () {
  const [state, dispatch] = useReducer(cartReducer, [])

  const addToCart = product => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = product => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })
  const initialstate = () => dispatch({
    type: 'INITIALIZE_CART',
    payload: []
  })

  const incrementQuantity = product => dispatch({
    type: 'INCREMENT_QUANTITY',
    payload: product
  })

  const decrementQuantity = product => dispatch({
    type: 'DECREMENT_QUANTITY',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return { state, addToCart, removeFromCart, clearCart, initialstate, incrementQuantity, decrementQuantity }
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartProvider ({ children }) {
  const { state, addToCart, removeFromCart, clearCart, initialstate, incrementQuantity, decrementQuantity } = useCartReducer()
  useEffect(() => {
    initialstate()
  }, [])
  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart,
      incrementQuantity,
      decrementQuantity
    }}
    >
      {children}
    </CartContext.Provider>
  )
}
