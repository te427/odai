import React from 'react'
import ReactDOM from 'react-dom'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import '../node_modules/uikit/dist/css/uikit.min.css'
import './app.css'

import { Provider } from 'react-redux'
import store from './store/store'
import { setCsrf, setPage, setArticles } from './store/actions'

import App from './App'

// loads the Icon plugin
UIkit.use(Icons)

store.dispatch(setPage(2))
store.dispatch(setArticles())
store.dispatch(setCsrf())

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
