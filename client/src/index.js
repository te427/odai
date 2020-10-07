import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import '../node_modules/uikit/dist/css/uikit.min.css'
import './app.css'

import { Provider } from 'react-redux'
import store from './store/store'

import api from './services/api'

import App from './App'

// loads the Icon plugin
UIkit.use(Icons)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
