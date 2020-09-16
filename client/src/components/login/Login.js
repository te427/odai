import React from 'react'
import { connect } from 'react-redux'
import store from '../../store/store'
import { setLogin, setLogout } from '../../store/actions'

const onClick = () => {
  store.dispatch(setLogout())
}

const onSubmit = (e) => {
  e.preventDefault()

  const form = new FormData(e.target)

  store.dispatch(setLogin(form))
}

const Login = ({ csrf, loggedIn }) => (
  <div class="login">
    {!loggedIn
      ? (<form action="http://localhost:8000/api-auth/login/"
            method="POST" onSubmit={onSubmit}>
          <label>LOGIN</label>
          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: user"></span>
              <input class="uk-input" name="username" type="text" required/>
            </div>
          </div>
          <div class="uk-margin">
            <div class="uk-inline">
              <span class="uk-form-icon" uk-icon="icon: lock"></span>
              <input class="uk-input" name="password" type="password" required/>
            </div>
          </div>
          <input type="hidden" name="csrfmiddlewaretoken" value={csrf} />
          <button class="uk-button uk-button-default">Submit</button>
        </form>)
      : (<button class="uk-button uk-button-default"
          onClick={onClick}>Logout</button>) }
  </div>
)

const mapStateToProps = (state) => (
  { csrf: state.auth.csrf, loggedIn: state.auth.loggedIn }
)

export default connect(mapStateToProps)(Login)