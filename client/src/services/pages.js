import api from './api'
function convertDatesToDate(p) {
  p.creationDate = new Date(p.creationDate)

  if (p.modificationDate) {
    p.modificationDate = new Date(p.modificationDate)
  }
}

function convertDatesToString(p) {
  convertDatesToDate(p)
  p.creationDate = p.creationDate.toLocaleString()

  if (p.modificationDate) {
    p.modificationDate = p.modificationDate.toLocaleString()
  }
}

export default {
  async page(id) {
    const page = await api.page(id)

    convertDatesToString(page)

    return page
  },
  async pages() {
    return api.pages()
  },
  async articles() {
    const pages = await api.pages()
    const articles = {}

    pages.forEach(p => {
      convertDatesToDate(p)

      let date = p.creationDate
      let year = date.getFullYear()
      let month = date.toLocaleString('default', { month: 'long' })

      articles[year] = articles[year] || {}
      articles[year][month] = articles[year][month] || {}

      articles[year][month][p.titleText] = p.id
    })

    return articles
  }
}