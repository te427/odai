import articles from '../services/articles'
import auth from '../services/auth'
import notification from '../services/notification'

// auth
export const SET_CSRF = 'SET_CSRF'
export const SET_LOGIN = 'SET_LOGIN'
export const SET_LOGOUT = 'SET_LOGOUT'

// article
export const SET_ARTICLE = 'SET_ARTICLE'
export const SET_ARTICLES = 'SET_ARTICLES'
export const SET_EDITING = 'SET_EDITING'
export const SAVE_ARTICLE = 'SAVE_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'

export function setCsrf() {
  return async (dispatch) => {
    let csrf = auth.getCsrf()

    dispatch({ type: SET_CSRF, csrf })
  }
}

export function setLogin(form) {
  return async (dispatch) => {
    let res = await auth.authenticate(form)

    let loggedIn = res.ok
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

export function setArticle(id) {
  return async (dispatch) => {
    const article = await articles.article(id)
    dispatch({ type: SET_ARTICLE, article })
  }
}

export function setArticles() {
  return async (dispatch) => {
    const list = await articles.articles()
    dispatch({ type: SET_ARTICLES, list })
  }
}

export function setEditing(editing) {
  return async (dispatch) => {
    dispatch({ type: SET_EDITING, editing })
  }
}

export function saveArticle() {
  return async (dispatch, getState) => {
    let { article } = getState().articles
    await articles.saveArticle(article)

    dispatch({ type: SAVE_ARTICLE, article })
  }
}

export function deleteArticle() {
  return async (dispatch, getState) => {
    let { article } = getState().articles
    await articles.deleteArticle(article)

    dispatch({ type: DELETE_ARTICLE, article })
  }
}