import pages from '../services/pages'
import auth from '../services/auth'
import notification from '../services/notification'

export const SET_CSRF = 'SET_CSRF'
export const SET_LOGIN = 'SET_LOGIN'
export const SET_LOGOUT = 'SET_LOGOUT'
export const SET_PAGE = 'SET_PAGE'
export const SET_ARTICLES = 'SET_ARTICLES'

export function setCsrf() {
  return async (dispatch) => {
    let csrf = document.cookie
      .split(';')
      .find(c => c.includes('csrf'))
      .split('=')[1]

    dispatch({ type: SET_CSRF, csrf })
  }
}

export function setLogin(form) {
  return async (dispatch) => {
    let res = await auth.authenticate(form)

    // a lazy hack
    let loggedIn = res.status === 404
    let username = form.get('username')

    if (loggedIn) {
      notification.success(`${username} has logged in successfully.`)
    } else {
      notification.error(`${username} was unable to log in, please retry.`)
    }

    let info = {
      username,
      loggedIn 
    }

    dispatch({ type: SET_LOGIN, info })
  }
}

export function setLogout() {
  return async (dispatch) => {
    await auth.logout()

    notification.info('Successfully logged out.')

    dispatch({ type: SET_LOGOUT })
  }
}

export function setPage(id) {
  return async (dispatch) => {
    const page = await pages.page(id)
    dispatch({ type: SET_PAGE, page })
  }
}

export function setArticles() {
  return async (dispatch) => {
    const articles = await pages.articles()
    dispatch({ type: SET_ARTICLES, articles })
  }
}