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
      <div class="uk-margin">
        <input class="uk-input" type="text" placeholder="Title"
            value={article.titleText} onChange={onTitleChange}/>
      </div>
      <div class="uk-margin">
        {article.creationDate
          ? (<div><label class="uk-label">Created:{article.creationDate}</label></div>)
          : null}
        {article.modificationDate
          ? (<div><label class="uk-label">Modified:{article.modificationDate}</label></div>)
          : null}
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