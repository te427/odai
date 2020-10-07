export default {
  get(key) {
    let kv = document.cookie
          .split(';')
          .find(c => c.includes(key))

    return kv ? kv.split('=')[1] : null
  }
}