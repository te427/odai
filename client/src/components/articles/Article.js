import React from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'

import store from '../../store/store'
import { setArticles } from '../../store/actions'

import {
  newArticle,
  saveArticle,
  deleteArticle,
  setPublished,
  setEditing,
  discardArticle
} from '../../store/actions'

import Content from './Content'
import Edit from './Edit'

import { Prompt } from 'react-router-dom'

store.dispatch(setArticles())

const Article = ({
    hasArticle,
    isDraft,
    loggedIn,
    editing,
    newArticle,
    saveArticle,
    togglePublish,
    startEditing,
    discardArticle,
    deleteArticle }) => {
  const match = useRouteMatch()

  function handleNav() {
    let nav = window.confirm('You will lose your edits if you continue - proceed?')

    if (nav) {
      store.dispatch(setEditing(false))
    }

    return true
  }

  const modifyButtons = editing
    ? (<span>
        <button class="uk-button uk-button-default"
            onClick={saveArticle}>SAVE</button>
        <button class="uk-button uk-button-danger"
            onClick={discardArticle}>DISCARD</button>
        <button class="uk-button uk-button-secondary"
            onClick={togglePublish}>
          { isDraft ? "PUBLISH" : "MARK AS DRAFT"}
        </button>
        <button class="uk-button uk-button-danger"
            onClick={deleteArticle}>DELETE</button>
      </span>)
    : hasArticle && !match.isExact
      ? (<button class="uk-button uk-button-default"
          onClick={startEditing}>EDIT</button>) 
      : null

  const editMenu = loggedIn
    ? (<div class="uk-card uk-margin">
        <button class="uk-button uk-button-primary" onClick={newArticle}>NEW</button>
        {modifyButtons}
      </div>)
    : null

  const content = editing ? (<Edit/>) : (<Content/>)

  return (
    <div class="uk-card uk-width-3-5">
      {editMenu}
      <Prompt when={editing} message={handleNav} />
      <Route path={`${match.path}/:articleName`}>
        {content}
      </Route>
    </div>
  ) 
}

const mapStateToProps = (state) => ({
  hasArticle: !!Object.keys(state.articles.detail).length,
  isDraft: state.articles.draft.isDraft,
  loggedIn: state.auth.loggedIn,
  editing: state.articles.editing
})

const mapDispatchToProps = (dispatch) => {
  return {
    newArticle: () => dispatch(newArticle()),
    saveArticle: () => dispatch(saveArticle()),
    startEditing: () => dispatch(setEditing(true)),
    togglePublish: () => dispatch(setPublished()),
    discardArticle: () => dispatch(discardArticle()),
    deleteArticle: () => dispatch(deleteArticle())
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Article)


