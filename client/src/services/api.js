import cookies from './cookies'

const PROTOCOL = process.env.REACT_APP_API_PROTOCOL
const HOST = process.env.REACT_APP_API_HOST
const PORT = process.env.REACT_APP_API_PORT

const ADDR = `${PROTOCOL}://${HOST}:${PORT}/`

function formOptions () {
  return {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-csrftoken': cookies.get('csrf')
    }
  }
}

function jsonOptions (method) {
  return {
    method,
    credentials: 'include',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-csrftoken': cookies.get('csrf')
    }
  }
}



const GET_OPTIONS = { method: 'GET' }
const DELETE_OPTIONS = { method: 'DELETE' }

async function f(path, data = GET_OPTIONS) {
  return fetch(`${ADDR}${path}`, data)
} 

const o = async (res) => c(await l(res))
const l = async (res) => await (await res).json()
const c = (o) => Object.keys(o).reduce((acc, k) => ({ ...acc, [cc(k)]: o[k]}), {})
const s = (o) => Object.keys(o).reduce((acc, k) => ({ ...acc, [sc(k)]: o[k]}), {})
const cc = (s) => s.replace(/_[a-z]/g, chars => `${chars[1].toUpperCase()}`)
const sc = (s) => s.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)

export default {
  async auth(form) {
    let params = new URLSearchParams()

    Array(...form.entries()).forEach(q => params.append(q[0], q[1]))
    
    return f(`api-auth/login/`, {
      body: params,
      ...formOptions()
    })
  },
  async logout() {
    return f('api-auth/logout/')
  },
  async articles() {
    return (await l(f('api/articles/'))).map(obj => c(obj))
  },
  async article(id) {
    return o(f(`api/articles/${id}`))
  },
  async saveArticle(article) {
    let snakeCase = s(article)
    if (article.id) {
      return f(`api/articles/${article.id}/`, {
        body: JSON.stringify(snakeCase),
        ...jsonOptions('PUT')
      })
    } 
    return f(`api/articles/`, {
      body: JSON.stringify(snakeCase),
      ...jsonOptions('POST')
    })
  },
  async deleteArticle(id) {
    return f(`api/articles/${id}`, DELETE_OPTIONS)
  }
}