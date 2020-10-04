const COOKIE = document.cookie
      .split(';')
      .find(c => c.includes('csrf'))
      .split('=')[1]

const ADDR = 'http://localhost:8000/'

const FORM_OPTIONS = {
  method: 'POST',
  credentials: 'include',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-csrftoken': COOKIE
  }
}

const JSON_OPTIONS = {
  credentials: 'include',
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
    'x-csrftoken': COOKIE
  }
}

const GET_OPTIONS = { method: 'GET' }
const POST_JSON_OPTIONS = { ...JSON_OPTIONS, method: 'POST'}
const PUT_JSON_OPTIONS = { ...JSON_OPTIONS, method: 'PUT' }
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
      ...FORM_OPTIONS
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
        ...PUT_JSON_OPTIONS
      })
    } 
    return f(`api/articles/`, {
      body: JSON.stringify(snakeCase),
      ...POST_JSON_OPTIONS
    })
  },
  async deleteArticle(id) {
    return f(`api/articles/${id}`, DELETE_OPTIONS)
  }
}