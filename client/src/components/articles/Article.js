import React from 'react'
import { connect } from 'react-redux'
import { Route, useRouteMatch } from 'react-router-dom'
import { markdown } from 'markdown'


const Article = ({ page }) => {
  const match = useRouteMatch()

  return (
    <div class="uk-card uk-width-3-5">
      <Route path={`${match.path}/:articleName`}>
        <article class="uk-article">
          <h1 class="uk-article-title">{ page.titleText }</h1>
          <p class="uk-article-meta">Written on { page.creationDate } by Kieran Collery</p>
          <div dangerouslySetInnerHTML={{ __html: markdown.toHTML(page.pageText)}} />
        </article>
     </Route>
    </div>
  )
}


const mapStateToProps = (state) => ({ page: state.page })
  
export default connect(mapStateToProps)(Article)


