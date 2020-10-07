import articles from '../services/articles'
import auth from '../services/auth'
import notification from '../services/notification'

// auth
export const SET_LOGIN = 'SET_LOGIN'
export const SET_LOGOUT = 'SET_LOGOUT'

// article
export const SET_ARTICLE = 'SET_ARTICLE'
export const SET_ARTICLES = 'SET_ARTICLES'
export const SET_EDITING = 'SET_EDITING'
export const SET_PUBLISHED = 'SET_PUBLISHED'
export const NEW_ARTICLE = 'NEW_ARTICLE'
export const EDIT_ARTICLE = 'EDIT_ARTICLE'
export const SAVE_ARTICLE = 'SAVE_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'

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
    if(!id) {
      dispatch({ type: SET_ARTICLE, article: {} })
      return
    }

    const article = await articles.article(id)

    dispatch({ type: SET_ARTICLE, article })
  }
}

export function setArticleByName(name) {
  return async (dispatch, getState) => {
    let val = getState().articles.dict[name]
    if (val) {
      let id = val.id
      const article = await articles.article(id)

      dispatch({ type: SET_ARTICLE, article })
    }
  }
}

export function setArticles(refresh = false) {
  return async (dispatch) => {
    const list = await articles.articles(refresh)
    const dict = await articles.articlesByName()
    
    dispatch({ type: SET_ARTICLES, data: { list, dict } })

    let paths = window.location.pathname
      .split('/')
    let current = paths.length > 2 ? paths[2] : ''

    let article = !!current.length
      ? dict[current.replace(/-/, ' ')]
      : {}

    setArticle(article ? article.id : null)(dispatch)
  }
}

export function setEditing(editing) {
  return async (dispatch, getState) => {
    if (editing) {
      let { 
        titleText, 
        articleText, 
        isDraft, 
        creationDate,
        modificationDate
      } = getState().articles.detail
      dispatch({ type: EDIT_ARTICLE,
        article: {
          titleText,
          articleText,
          isDraft,
          creationDate,
          modificationDate
        }
      })
    }
    dispatch({ type: SET_EDITING, editing })
  }
}

export function setPublished() {
  return async (dispatch) => {
    dispatch({ type: SET_PUBLISHED })
  }
}

export function newArticle() {
  return async (dispatch) => {
    dispatch({ type: NEW_ARTICLE })
  }
}

export function editArticle(article) {
  return async (dispatch) => {
    dispatch({ type: EDIT_ARTICLE, article})
  }
}

export function discardArticle() {
  return async (dispatch, getState) => {
    let discard = window.confirm('Do you want to discard this article?')
    if (!discard) return

    dispatch({ type: EDIT_ARTICLE, article: {} })

    dispatch({ type: SET_EDITING, editing: false })

    let { id } = getState().articles.detail

    setArticle(id)(dispatch)
  }
}

export function saveArticle() {
  return async (dispatch, getState) => {
    let save = window.confirm('Do you want to save this article?')
    if (!save) return

    let { draft, detail } = getState().articles
    let article = { ...detail, ...draft }

    await articles.save(article)

    dispatch({ type: SAVE_ARTICLE, article })

    dispatch({ type: SET_EDITING, editing: false })

    setArticles(true)(dispatch)
      .then(() => setArticleByName(article.titleText)(dispatch, getState))
  }
}

export function deleteArticle() {
  return async (dispatch, getState) => {
    let del = window.confirm('Are you sure you want to delete this article?')
    if (!del) return

    let { detail } = getState().articles

    await articles.delete(detail.id)

    dispatch({ type: DELETE_ARTICLE, article: detail })
    dispatch({ type: SET_EDITING, editing: false })
  }
}