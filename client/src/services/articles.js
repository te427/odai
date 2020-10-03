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
  async article(id) {
    const article = await api.article(id)

    convertDatesToString(article)

    return article
  },
  async articles() {
    return api.articles()
  },
  async articles() {
    const res = await api.articles()
    const articles = {}

    res.forEach(p => {
      convertDatesToDate(p)

      let date = p.creationDate
      let year = date.getFullYear()
      let month = date.toLocaleString('default', { month: 'long' })

      articles[year] = articles[year] || {}
      articles[year][month] = articles[year][month] || {}

      articles[year][month][p.titleText] = p.id
    })

    return articles
  },
  async save(article) {
    return await api.saveArticle(article)
  },
  async delete(article) {
    return await api.deleteArticle(article)
  }
}