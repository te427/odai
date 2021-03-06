import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Nav from './Nav'

import Home from '../home/Home'
import Login from '../login/Login'
import Article from '../articles/Article'
import Recipe from '../recipes/Recipe'

const Page = () => (
  <div className="uk-grid">
    <Nav/>
    <div className="uk-card uk-width-4-5">
      <Switch>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/articles">
          <Article/>
        </Route>
        <Route path="/recipes">
          <Recipe/>
        </Route>
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </div>
  </div>
)

export default Page 
