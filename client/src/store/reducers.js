import { SET_PAGE, SET_ARTICLES, SET_LOGIN, SET_CSRF, SET_LOGOUT } from './actions'

const initialState = {
  auth: {
    csrf: null,
    username: null,
    loggedIn: false
  },
  page: {
    titleText: 'This is a page from the store',
    creationDate: Date(),
    modificationDate: Date(),
    pageText: 'This is some body text' 
  },
  articles: {
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
  }
}

function pagesApp(state = initialState, action) {
  switch(action.type) {
    case SET_CSRF:
      return { ...state, auth: { ...state.auth, csrf: action.csrf}}
    case SET_LOGIN:
      return { ...state, 
        auth: {
          ...state.auth,
          username: action.info.username,
          loggedIn: action.info.loggedIn 
        }
      }
    case SET_LOGOUT:
      return { ...state, auth: { ...state.auth, username: null, loggedIn: false}}
    case SET_PAGE:
      return { ...state, page: action.page }
    case SET_ARTICLES:
      return { ...state, articles: action.articles }
    default:
      return state
  }
}

export default pagesApp