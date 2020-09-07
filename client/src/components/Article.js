import React from 'react'
import { connect } from 'react-redux'
import { markdown } from 'markdown'

const Article = ({ page }) => (
  <div class="uk-card uk-width-3-5">
    <article class="uk-article">
      <h1 class="uk-article-title">{ page.titleText }</h1>
      <p class="uk-article-meta">Written on { page.creationDate } by Kieran Collery</p>
      <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(page.pageText)}} />
    </article>
  </div>
)

const mapStateToProps = (state) => ({ page: state.page })
  
export default connect(mapStateToProps)(Article)


