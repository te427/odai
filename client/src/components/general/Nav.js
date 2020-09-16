import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import ArticleSubNav from '../articles/SubNav'

const Nav = () => (
  <div class="uk-card uk-width-1-5">
    <div>
      THE <br/>
      <Link to="/login"><b>ECHO</b></Link> <br/>
      CHAMBER <br/>
    </div>
    <hr class="uk-divider"/>
    <ul class="uk-nav uk-nav-default">
      <li>
        <Link to="/">HOME</Link>
      </li>
      <li>
        <Link to="/articles">ARTICLES</Link>
      </li>
      <li>
        <Link to="/recipes">RECIPES</Link>
      </li>
    </ul>
    <hr class="uk-divider"/>
    <Switch>
      <Route path="/articles">
        <ArticleSubNav/>
      </Route>
    </Switch>
  </div>
)

export default Nav 
