import api from './api'

export default {
  getCsrf() {
    let csrf = document.cookie
      .split(';')
      .find(c => c.includes('csrf'))

    return csrf ? csrf.split('=')[1] : null
  },
  getUsername() {
    let username = document.cookie
      .split(';')
      .find(c => c.includes('loggedIn'))
    
    return username ? username.split('=')[1] : null
  },
  async authenticate(form) {
    let res = await api.auth(form)

    if (res.ok) {
      let username = form.get('username')
      document.cookie = `loggedIn=${username}`
      debugger
    }

    return res
  },
  async logout() {
    document.cookie = document.cookie
      .split(';')
      .filter(c => !c.includes('loggedIn'))
      .join(';')
    return api.logout()
  }
}