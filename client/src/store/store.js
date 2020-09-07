import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pagesApp from './reducers'

export default createStore(
  pagesApp,
  applyMiddleware(thunk)
)
