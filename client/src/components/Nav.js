import React from 'react'

import SubNav from './SubNav'

const Nav = () =>(
  <div class="uk-card uk-width-1-5">
    <ul class="uk-nav uk-nav-default">
      <li class="uk-active"><a href="#">HOME</a></li>
    </ul>
    <hr class="uk-divider"/>
    <SubNav/>
  </div>
)

export default Nav 
