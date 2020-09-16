import { SET_LOGOUT } from "../store/actions"

const ADDR = 'http://localhost:8000/'

async function f(path, data = { method: 'GET' }) {
  return fetch(`${ADDR}${path}`, data)
} 

const o = async (res) => c(await l(res))
const l = async (res) => await (await res).json()
const c = (o) => Object.keys(o).reduce((acc, k) => ({ ...acc, [cc(k)]: o[k]}), {})
const cc = (s) => s.replace(/_[a-z]/g, chars => `${chars[1].toUpperCase()}`)

export default {
  async auth(form) {
    let params = new URLSearchParams()

    Array(...form.entries()).forEach(q => params.append(q[0], q[1]))
    
    return f(`api-auth/login/`, {
      method: 'POST',
      body: params,
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-csrftoken': form.get('csrfmiddlewaretoken')
      }
    })
  },
  async logout() {
    return f('api-auth/logout/')
  },
  async pages() {
    return (await l(f('api/pages/'))).map(obj => c(obj))
  },
  async page(id) {
    return o(f(`api/pages/${id}`))
  }
}