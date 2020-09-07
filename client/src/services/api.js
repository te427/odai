const ADDR = 'http://localhost:8000/api/'

async function f() {
  return fetch(p([...arguments]))
} 

const o = async (res) => c(await l(res))
const l = async (res) => await (await res).json()
const p = (args) => args.reduce((acc, a) => acc + a, ADDR)
const c = (o) => Object.keys(o).reduce((acc, k) => ({ ...acc, [cc(k)]: o[k]}), {})
const cc = (s) => s.replace(/_[a-z]/g, chars => `${chars[1].toUpperCase()}`)

export default {
  async pages() {
    return (await l(f('pages/'))).map(obj => c(obj))
  },
  async page(id) {
    return o(f('pages/', id))
  }
}