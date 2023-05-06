export const cartInitialState = typeof window !== 'undefined' && window.localStorage.getItem('cart')
  ? JSON.parse(window.localStorage.getItem('cart'))
  : []

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  INITIALIZE_CART: 'INITIALIZE_CART',
  INCREMENT_QUANTITY: 'INCREMENT_QUANTITY',
  DECREMENT_QUANTITY: 'DECREMENT_QUANTITY'
}

// update localStorage with state for cart
export const updateLocalStorage = (state) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('cart', JSON.stringify(state))
  }
}

const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id, precio } = action.payload
    const productInCartIndex = state.findIndex(item => item.id === id)
    const price = parseFloat(precio)
    if (productInCartIndex >= 0) {
      // ⚡ usando el spread operator y slice
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1, subtotal: (state[productInCartIndex].quantity + 1) * price },
        ...state.slice(productInCartIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    const newState = [
      ...state,
      {
        ...action.payload, // product
        quantity: 1,
        subtotal: price
      }
    ]

    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  },
  [CART_ACTION_TYPES.INITIALIZE_CART]: () => {
    const newState = cartInitialState
    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.INCREMENT_QUANTITY]: (state, action) => {
    const productId = action.payload.id
    const precio = parseFloat(action.payload.precio)
    const productIndex = state.findIndex(item => item.id === productId)

    if (productIndex >= 0) {
      const newState = [
        ...state.slice(0, productIndex),
        { ...state[productIndex], quantity: state[productIndex].quantity + 1, subtotal: (state[productIndex].quantity + 1) * precio },
        ...state.slice(productIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    return state
  },
  [CART_ACTION_TYPES.DECREMENT_QUANTITY]: (state, action) => {
    const productId = action.payload.id
    const precio = parseFloat(action.payload.precio)
    const productIndex = state.findIndex(item => item.id === productId)

    if (productIndex >= 0 && state[productIndex].quantity > 1) {
      const newState = [
        ...state.slice(0, productIndex),
        { ...state[productIndex], quantity: state[productIndex].quantity - 1, subtotal: (state[productIndex].quantity - 1) * precio },
        ...state.slice(productIndex + 1)
      ]

      updateLocalStorage(newState)
      return newState
    }

    return state
  }
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}
