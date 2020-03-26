import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import loading from './loading'
import jokes from './jokes'

const appReducer = history => combineReducers({
  router: connectRouter(history),
  loading,
  jokes
})

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer
