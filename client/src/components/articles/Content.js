import React from 'react'
import { connect } from 'react-redux'
import { markdown } from 'markdown'

const Content = ({ article }) => (
  <article class="uk-article">
    <h1 class="uk-article-title">{ article.titleText }</h1>
    <p class="uk-article-meta">Written on { article.creationDate } by Kieran Collery</p>
    <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(article.articleText)}} />
  </article>
)

const mapStateToProps = (state) => ({ article: state.articles.detail })
  
export default connect(mapStateToProps)(Content)