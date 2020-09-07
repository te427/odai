import { SET_PAGE } from './actions'

const initialState = {
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
    case SET_PAGE:
      return { ...state, page: action.page }
    default:
      return state
  }
}

export default pagesApp