import { createAction, createReducer } from 'redux-act'

// Actions
export const showLoader = createAction('SHOW_LOADER')
export const hideLoader = createAction('HIDE_LOADER')

/** --------------------------------------------------
 *
 * Reducers
 *
 */
export const reducer = {
  [showLoader]: (state) => ({
    ...state,
    loading: true,
  }),
  [hideLoader]: (state) => ({
    ...state,
    loading: false,
  }),
}

const initialState = {
  loading: false,
}

export default createReducer(reducer, initialState)
