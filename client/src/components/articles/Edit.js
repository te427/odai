import React from 'react'
import { connect } from 'react-redux'
import { editArticle } from '../../store/actions'

import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const Edit = ({ article, editArticle }) => {
  function onTitleChange(e) {
    let titleText = e.target.value
    editArticle({ titleText })
  }

  function onTextChange(articleText) {
    editArticle({ articleText })
  }

  return (<div>
      <div class="uk-flex uk-flex-between uk-margin">
        {article.creationDate
          ? (<div><i>Created:{article.creationDate}</i></div>)
          : null}
        {article.modificationDate
          ? (<div><i>Modified:{article.modificationDate}</i></div>)
          : null}
      </div>
      <div class="uk-margin">
        <input class="uk-input" type="text" placeholder="Title"
            value={article.titleText} onChange={onTitleChange}/>
      </div>
      <SimpleMDE onChange={onTextChange} value={article.articleText}/>
    </div>
  ) 
}

const mapStateToProps = (state) => ({ article: state.articles.draft })

const mapDispatchToProps = (dispatch) => {
  return {
    editArticle: (article) => dispatch(editArticle(article)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit)