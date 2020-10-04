import api from './api'

function convertDatesToDate(article) {
  article.creationDate = new Date(article.creationDate)

  if (article.modificationDate) {
    article.modificationDate = new Date(article.modificationDate)
  }
}

function convertDatesToString(article) {
  convertDatesToDate(article)
  article.creationDate = article.creationDate.toLocaleString()

  if (article.modificationDate) {
    article.modificationDate = article.modificationDate.toLocaleString()
  }
}

function addRouteName(article) {
  article.routeName = article.titleText.replace(/ /, '-')
}

function addMonthAndYear(article, month, year) {
  article.year = year
  article.month = month
}

var cache
const hasCache = () => !!cache

async function getArticles(refresh) {
  if (!hasCache() || refresh) {
    cache = await api.articles()
  }

  cache.forEach(convertDatesToDate)
  cache.forEach(addRouteName)
  cache.forEach(addMonthAndYear)

  return cache
}

export default {
  async article(id) {
    const article = await api.article(id)

    convertDatesToDate(article)

    let date = article.creationDate
    let year = date.getFullYear()
    let month = date.toLocaleString('default', { month: 'long' })

    addMonthAndYear(article, month, year)

    convertDatesToString(article)

    return article
  },
  async articlesByName() {
    const res = await getArticles()
    const articles = {}

    res.forEach(article => {
      convertDatesToDate(article)

      articles[article.titleText] = article
    })

    return articles
  },
  async articles(refresh) {
    const res = await getArticles(refresh)
    const articles = {}

    res.forEach(article => {
      let date = article.creationDate
      let year = date.getFullYear()
      let month = date.toLocaleString('default', { month: 'long' })

      articles[year] = articles[year] || {}
      articles[year][month] = articles[year][month] || {}

      articles[year][month][article.titleText] = article
    })

    return articles
  },
  async save(article) {
    return await api.saveArticle(article)
  },
  async delete(id) {
    return await api.deleteArticle(id)
  }
}