/*
  eslint-disable no-global-assign
*/

require = require('esm')(module)
require('dotenv').config({ path: '.env' })

const fs = require('fs').promises
const path = require('path')
const fmparse = require('front-matter')
const { formatReadingTime } = require('./utils/helpers')
const { ACTIVATE_ADS } = require('./utils/config')

const generatePostList = async () => {
  console.time('Done generate published post lists')

  try {
    const publishedPath = path.resolve(__dirname, 'contents/posts/published')

    const result = (await Promise.all((await fs.readdir(publishedPath, 'utf-8'))
      .map(name =>
        fs.readFile(path.resolve(publishedPath, name, 'index.md'), 'utf-8')
          .then(res => fmparse(res))
          .then(({ attributes, body }) => ({ ...attributes, readingtime: formatReadingTime(body) }))
          .catch(err => {
            if (err.code !== 'ENOTDIR') {
              throw err
            }
            return false
          })
      )))
      .filter(Boolean)
      .sort((a, b) => b.date.getTime() - a.date.getTime())

    await Promise.all([
      fs.writeFile(path.resolve(publishedPath, 'index.js'), `/* eslint-disable */\n\nexport default ${JSON.stringify(result.map(attr => ({ name: attr.slug })))}`),
      fs.writeFile(path.resolve(__dirname, 'static/posts.published.json'), JSON.stringify(result))
    ])

    console.timeEnd('Done generate published post lists')
  } catch (err) {
    console.error('an error occured during generate posts:', err)
  }
}

generatePostList()

!ACTIVATE_ADS || fs.writeFile(
  path.resolve('static', 'ads.txt'),
  `google.com, ${process.env.GOOGLE_ADSENSE_ID.replace(/ca-/, '')}, DIRECT, f08c47fec0942fa0`
)
