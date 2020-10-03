import * as actions from './actions'
import auth from '../services/auth'

let username = auth.getUsername()
debugger

const initialState = {
  auth: {
    csrf: null,
    username,
    loggedIn: !!username 
  },
  articles: {
    detail: {
      id: 0,
      titleText: 'This is a page from the store',
      creationDate: Date(),
      modificationDate: Date(),
      articleText: 'This is some body text',
      isDraft: false
    },
    list: {
      [2019]: {
        September: {
          ['The Song of Boo']: 1,
          ['Outer Limits']: 2
        },
        December: {
          ['A Dream of Boo']: 3
        }
      },
      [2020]: {
        July: {
          ['The Year So Far']: 4
        },
        August: {
          ['Springtime']: 5
        }
      }
    },
    editing: false
  },
}

function pagesApp(state = initialState, action) {
  switch(action.type) {
    case actions.SET_CSRF:
      return { ...state, auth: { ...state.auth, csrf: action.csrf}}
    case actions.SET_LOGIN:
      return { ...state, 
        auth: {
          ...state.auth,
          username: action.info.username,
          loggedIn: action.info.loggedIn 
        }
      }
    case actions.SET_LOGOUT:
      return { ...state, auth: { ...state.auth, username: null, loggedIn: false}}
    case actions.SET_ARTICLE:
      return { ...state, articles: { ...state.articles, detail: action.article } }
    case actions.SET_ARTICLES:
      return { ...state, articles: { ...state.articles, list: action.list } }
    case actions.SET_EDITING:
      return { ...state, articles: { ...state.articles, editing: action.editing } }
    case actions.SAVE_ARTICLE:
      return { ...state, articles: { ...state.articles, detail: action.article } }
    case actions.DELETE_ARTICLE:
      return { ...state, articles: {
        ...state.articles,
        list: state.articles.list.filter(a => a.id === action.article.id) }}
    default:
      return state
  }
}

export default pagesApp