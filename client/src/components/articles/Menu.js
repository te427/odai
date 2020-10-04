import React from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import {
  newArticle,
  saveArticle,
  deleteArticle,
  setEditing,
  setPublished,
  discardArticle
} from '../../store/actions'

const Menu = ({
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

  const modifyButtons = editing
    ? (<span>
        <button class="uk-button uk-button-default uk-button-small"
            onClick={saveArticle}>SAVE</button>
        <button class="uk-button uk-button-default uk-button-small"
            onClick={discardArticle}>DISCARD</button>
        <button class="uk-button uk-button-default uk-button-small"
            onClick={togglePublish}>
          { isDraft ? "PUBLISH" : "MARK AS DRAFT"}
        </button>
        <button class="uk-button uk-button-default uk-button-small"
            onClick={deleteArticle}>DELETE</button>
      </span>)
    : hasArticle && !match.isExact
      ? (<button class="uk-button uk-button-default uk-button-small"
          onClick={startEditing}>EDIT</button>) 
      : null

  return loggedIn
    ? (<div class="uk-card uk-margin">
        <button class="uk-button uk-button-default uk-button-small" onClick={newArticle}>NEW</button>
        {modifyButtons}
      </div>)
    : null
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
 

export default connect(mapStateToProps, mapDispatchToProps)(Menu)