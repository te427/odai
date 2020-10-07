import api from './api'

export default {
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
    }

    return res
  },
  async logout() {
    document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    return api.logout()
  }
}