import { createStore, applyMiddleware, compose } from 'redux'
// import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import { createLogicMiddleware } from 'redux-logic'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import promiseMiddleware from 'redux-promise'
import rootReducer from './reducers'
import rootSaga from './sagas'
import arrLogic from './reduxLogic'

// configure reduxRouterMiddleware
export const history = createBrowserHistory()
const reduxRouterMiddleware = routerMiddleware(history)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const deps = {
  // optional injected dependencies for logic
  // anything you need to have available in your logic
}

// create the Logic middleWare
const logicMiddleware = createLogicMiddleware(arrLogic, deps)

const middlewares = [
  sagaMiddleware,
  promiseMiddleware,
  reduxRouterMiddleware,
  logicMiddleware,
]
const enhancers = [applyMiddleware(...middlewares)]
let composeEnhancers
if (process.env.NODE_ENV === 'prod') {
  composeEnhancers = compose
} else {
  composeEnhancers = require('redux-devtools-extension').composeWithDevTools
}

// mount it on the Store
const store = createStore(rootReducer(history), composeEnhancers(...enhancers))

// then run the saga
sagaMiddleware.run(rootSaga)

// render the application

export default store
