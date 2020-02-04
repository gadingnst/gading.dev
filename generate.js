/*
  eslint-disable no-global-assign
*/

require = require('esm')(module)

const fs = require('fs').promises
const path = require('path')
const fmparse = require('front-matter')
const { formatReadingTime } = require('./utils/helpers')

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
