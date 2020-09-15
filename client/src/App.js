import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Page from './components/general/Page'

function App() {
  return (
    <div class="uk-container uk-padding-large">
      <Router>
        <Page/>
      </Router>
    </div>
  )
}

export default App
