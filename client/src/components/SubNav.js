import React from 'react'
import { connect } from 'react-redux'
import { setPage } from '../store/actions'

const ArticleNav = (name, id, onClick) => (
  <li class="uk-nav-sub indented">
    <a href="#" onClick={onClick(id)}>{ name }</a>
  </li>
)

const MonthNav = (month, articles, onClick) => (
  <li class="uk-parent">
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

const SubNav = ({ articles, onClick }) => (
  <ul class="uk-nav-default" uk-nav="collapsible: true;">
    {Object.keys(articles).map(year => YearNav(year, articles[year], onClick))}
  </ul>
)

const mapStateToProps = (state) => ({ articles: state.articles })

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: id => {
      return () => dispatch(setPage(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubNav)
