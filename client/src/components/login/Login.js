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
  <div className="login">
    {!loggedIn
      ? (<form action="http://localhost:8000/api-auth/login/"
            method="POST" onSubmit={onSubmit}>
          <label>LOGIN</label>
          <div className="uk-margin">
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: user"></span>
              <input className="uk-input" name="username" type="text" required/>
            </div>
          </div>
          <div className="uk-margin">
            <div className="uk-inline">
              <span className="uk-form-icon" uk-icon="icon: lock"></span>
              <input className="uk-input" name="password" type="password" required/>
            </div>
          </div>
          <input type="hidden" name="csrfmiddlewaretoken" value={csrf} />
          <button className="uk-button uk-button-default">Submit</button>
        </form>)
      : (<button className="uk-button uk-button-default"
          onClick={onClick}>Logout</button>) }
  </div>
)

const mapStateToProps = (state) => (
  { csrf: state.auth.csrf, loggedIn: state.auth.loggedIn }
)

export default connect(mapStateToProps)(Login)