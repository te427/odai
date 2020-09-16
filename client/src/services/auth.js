import api from './api'

export default {
  authenticate(form) {
    return api.auth(form)
  },
  logout() {
    return api.logout()
  }
}