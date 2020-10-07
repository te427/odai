import React from 'react'
import { connect } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { setArticle } from '../../store/actions'

const ArticleNav = (name, article, onClick) => {
  const match = useRouteMatch()

  return (
    <li key={name} className="uk-nav-sub double-indented" 
        style={{fontStyle: article.isDraft ? 'italic' : 'normal'}}>
      <Link to={`${match.url}/${article.routeName}`} 
          onClick={onClick(article.id)}>{ name }</Link>
    </li>
  )
}

const MonthNav = (month, articles, onClick) => (
  <li key={month} className="uk-parent indented">
    <a href={month}>{ month }</a>
    <ul>
      {Object.keys(articles).map(name => ArticleNav(name, articles[name], onClick))}
    </ul>
  </li>
)

const YearNav = (year, articles, onClick) => (
  <li key={year} className="uk-parent">
    <a href={year}>{ year }</a>
    <ul className="uk-nav-default" uk-nav="collapsible: true;">
      {Object.keys(articles).map(month => MonthNav(month, articles[month], onClick))}
    </ul>
  </li>
)

const SubNav = ({ articles, onClick }) => (
  <div>
    <ul className="uk-nav-default" uk-nav="collapsible: true;">
      {Object.keys(articles).map(year => YearNav(year, articles[year], onClick))}
    </ul>
  </div>
)

const mapStateToProps = (state) => (
  { articles: state.articles.list }
)

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: id => {
      return () => dispatch(setArticle(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubNav)
