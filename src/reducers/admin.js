
export const ADMIN_ACTION_TYPES = {
  SET_PAGE_TITLE: 'SET_PAGE_TITLE'
}

const UPDATE_STATE_BY_ACTION = {
  [ADMIN_ACTION_TYPES.SET_PAGE_TITLE]: (state, action) => {
    state.pageTitle = action.payload.title
  }
}

export const adminReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  return updateState ? updateState(state, action) : state
}
