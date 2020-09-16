import React from 'react'
import { connect } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { setPage } from '../../store/actions'

const ArticleNav = (name, id, onClick) => {
  const match = useRouteMatch()

  return (
    <li class="uk-nav-sub double-indented">
      <Link to={`${match.url}/${name}`} onClick={onClick(id)}>{ name }</Link>
    </li>
  )
}

const MonthNav = (month, articles, onClick) => (
  <li class="uk-parent indented">
    <a href="#">{ month }</a>
    <ul>
      {Object.keys(articles).map(name => ArticleNav(name, articles[name], onClick))}
    </ul>
  </li>
)

const YearNav = (year, articles, onClick) => (
  <li class="uk-parent">
    <a href="#">{ year }</a>
    <ul class="uk-nav-default" uk-nav="collapsible: true;">
      {Object.keys(articles).map(month => MonthNav(month, articles[month], onClick))}
    </ul>
  </li>
)

const SubNav = ({ articles, loggedIn, onClick }) => (
  <div>
    <ul class="uk-nav-default" uk-nav="collapsible: true;">
      {Object.keys(articles).map(year => YearNav(year, articles[year], onClick))}
    </ul>
  </div>
)

const mapStateToProps = (state) => (
  { articles: state.articles, loggedIn: state.auth.loggedIn }
)

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: id => {
      return () => dispatch(setPage(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubNav)
