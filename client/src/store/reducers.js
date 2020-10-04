import * as actions from './actions'
import auth from '../services/auth'

let username = auth.getUsername()

const initialState = {
  auth: {
    csrf: null,
    username,
    loggedIn: !!username 
  },
  articles: {
    draft: {
      titleText: '',
      articleText: '',
      isDraft: true,
    },
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
    case actions.SET_PUBLISHED:
      return { ...state,
        articles: { 
          ...state.articles, 
          draft: { 
            ...state.articles.draft,
            isDraft: !state.articles.draft.isDraft
          }
        }
      }
    case actions.NEW_ARTICLE:
      return { ...state,
        articles: { 
          ...state.articles,
          editing: true,
          detail: {},
          draft: {
            titleText: '',
            articleText: '',
            isDraft: true
          }
        }
      }
    case actions.EDIT_ARTICLE:
      return { ...state,
        articles: {
          ...state.articles,
          draft: { ...state.articles.draft, ...action.article}  
        }
      }
    case actions.SAVE_ARTICLE:
      // make this add the article if it does not exist
      return { ...state, articles: { ...state.articles, detail: action.article } }
    case actions.DELETE_ARTICLE:
      // make this delete the article
      return { ...state, articles: { ...state.articles, detail: {}, draft: {}}}
    default:
      return state
  }
}

export default pagesApp