import UIkit from 'uikit'

export default {
  info(msg) {
    UIkit.notification(msg)
  },
  success(msg) {
    UIkit.notification(msg, 'success')
  },
  error(msg) {
    UIkit.notification(msg, 'danger')
  }
}