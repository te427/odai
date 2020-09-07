import React from 'react'
import { connect } from 'react-redux'

const ArticleNav = (name, id) => (
  <li class="uk-nav-sub"><a href="#">{ name }</a></li>
)

const MonthNav = (month, articles) => (
  <li class="uk-parent">
    <a href="#">{ month }</a>
    <ul>
      {Object.keys(articles).map(name => ArticleNav(name, articles[name]))}
    </ul>
  </li>
)

const YearNav = (year, articles) => (
  <li class="uk-parent">
    <a href="#">{ year }</a>
    <ul class="uk-nav-default" uk-nav="collapsible: true;">
      {Object.keys(articles).map(month => MonthNav(month, articles[month]))}
    </ul>
  </li>
)

const SubNav = ({ articles }) => (
  <ul class="uk-nav-default" uk-nav="collapsible: true;">
    {Object.keys(articles).map(year => YearNav(year, articles[year]))}
  </ul>
)

const mapStateToProps = (state) => ({ articles: state.articles })

export default connect(mapStateToProps)(SubNav)
