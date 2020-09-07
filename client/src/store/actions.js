import pages from '../services/pages'

export const SET_PAGE = 'SET_PAGE'
export const SET_ARTICLES = 'SET_ARTICLES'

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