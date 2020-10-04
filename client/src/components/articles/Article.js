import React from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'

import store from '../../store/store'
import { setArticles, setEditing } from '../../store/actions'

import Menu from './Menu'
import Content from './Content'
import Edit from './Edit'

import { Prompt } from 'react-router-dom'

store.dispatch(setArticles())

  function handleNav() {
    let nav = window.confirm('You will lose your edits if you continue - proceed?')

    if (nav) {
      store.dispatch(setEditing(false))
    }

    return true
  }

const Article = ({ editing }) => {
  const match = useRouteMatch()


  const content = editing ? (<Edit/>) : (<Content/>)

  return (
    <div class="uk-card uk-width-3-5">
      <Menu />
      <Prompt when={editing} message={handleNav} />
      <Route path={`${match.path}/:articleName`}>
        {content}
      </Route>
    </div>
  ) 
}

const mapStateToProps = (state) => ({
  editing: state.articles.editing
})
  
export default connect(mapStateToProps)(Article)


