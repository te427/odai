import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import ArticleSubNav from '../articles/SubNav'

const Nav = () => (
  <div class="uk-card uk-width-1-5">
    <div>
      TE <Link to="/login"><b>427</b></Link> <br/>
    </div>
    <hr class="uk-divider"/>
    <ul class="uk-nav uk-nav-default">
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/articles">ARTICLES</Link>
      </li>
    </ul>
    <hr className="uk-divider"/>
    <Switch>
      <Route path="/articles">
        <ArticleSubNav/>
      </Route>
    </Switch>
  </div>
)

export default Nav 
