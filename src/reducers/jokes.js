import { createReducer } from 'redux-act'
import { onSucessAction } from '../actions'

/** --------------------------------------------------
 *
 * Reducers
 *
 */
export const sampleReducer = {
  [onSucessAction]: (state, payload) => ({
    ...state,
    ...payload,
  }),
}

const sampleInitialState = {
  commentText: '',
  joke: 'Loading ....',
  id: '',
  items: [],
  isShow: false,
  isSort: false,
  selectedId: -1,
  selectedvalue: 'All'
}

export default createReducer(sampleReducer, sampleInitialState)
