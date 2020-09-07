import React from 'react'
import { connect } from 'react-redux'

const Article = ({ page }) => (
  <div class="uk-card uk-width-3-5">
    <article class="uk-article">
      <h1 class="uk-article-title">{ page.titleText }</h1>
      <p class="uk-article-meta">Written on { page.creationDate } by Kieran Collery</p>
      <p>{ page.pageText }</p>
    </article>
  </div>
)

const mapStateToProps = (state) => ({ page: state.page })
  
export default connect(mapStateToProps)(Article)


