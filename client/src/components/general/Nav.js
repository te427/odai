import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import ArticleSubNav from '../articles/SubNav'

const Nav = () => (
  <div className="uk-card uk-width-1-5">
    <div>
      <img className="pixelated" src={process.env.PUBLIC_URL + '/self.png'}></img>
    </div>
    <hr className="uk-divider"/>
    <div>
      TE <Link to="/login"><b>427</b></Link> <br/>
    </div>
    <hr className="uk-divider"/>
    <div>
      <a href="http://github.com/te427" className="uk-margin-small-right">
        <span uk-icon="icon: github"></span>
      </a>
      <a href="mailto:kieran.collery@gmail.com" className="uk-margin-small-right">
        <span uk-icon="icon: mail"></span>
      </a>
      <a href="linkedin.com/in/kcollery" className="uk-margin-small-right">
        <span uk-icon="icon: linkedin"></span>
      </a>
    </div>
    <hr className="uk-divider"/>
    <ul className="uk-nav uk-nav-default">
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
