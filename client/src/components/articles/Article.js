import React from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'

import { saveArticle, deleteArticle, setEditing } from '../../store/actions'

import Content from './Content'
import Edit from './Edit'

const Article = ({
    article,
    loggedIn,
    editing,
    saveArticle,
    startEditing,
    stopEditing,
    deleteArticle }) => {
  const match = useRouteMatch()

  const modifyButtons = editing
    ? (<div>
        <button class="uk-button uk-button-default"
            onClick={saveArticle}>SAVE</button>
        <button class="uk-button uk-button-default"
            onClick={stopEditing}>DISCARD</button>
      </div>)
    : (<button class="uk-button uk-button-default"
          onClick={startEditing}>EDIT</button>) 

  const statusButton = (
    <button class="uk-button uk-button-secondary">
      { article.isDraft ? "PUBLISH" : "MARK AS DRAFT"}
    </button>
  )

  const editMenu = loggedIn 
    ? (<div class="uk-card uk-margin">
        {modifyButtons}
        {statusButton}
        <button class="uk-button uk-button-danger"
            onClick={deleteArticle}>DELETE</button>
      </div>)
    : null

  const content = editing ? (<Edit/>) : (<Content/>)

  return (
    <div class="uk-card uk-width-3-5">
      {editMenu}
      <Route path={`${match.path}/:articleName`}>
        {content}
     </Route>
    </div>
  )
}

const mapStateToProps = (state) => ({
  article: state.articles.detail,
  loggedIn: state.auth.loggedIn,
  editing: state.articles.editing
})

const mapDispatchToProps = (dispatch) => {
  return {
    saveArticle: () => {
      return () => dispatch(saveArticle())
    },
    startEditing: () => {
      return () => dispatch(setEditing(true))
    },
    stopEditing: () => {
      return () => dispatch(setEditing(true))
    },
    deleteArticle: () => {
      return () => dispatch(deleteArticle())
    }
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Article)


