const fs = require('fs').promises
const path = require('path')
const fmparse = require('front-matter')
const readingTime = require('reading-time')

const formatReadingTime = contents => {
  const { minutes, text } = readingTime(contents)
  const cups = Math.round(minutes / 5)
  return `${new Array(cups || 1).fill('☕️').join('')} ${text}`
}

const generatePostList = async () => {
  console.log('Generating published post lists ...')

  const publishedPath = path.resolve(__dirname, 'contents/posts/published')
  let result = await Promise.all((await fs.readdir(publishedPath, 'utf-8')).map(async res => ({
    [res]: (await fs.lstat(path.resolve(publishedPath, res))).isDirectory()
  })))

  result = result.filter(res => res[Object.keys(res)[0]] === true)

  result = await Promise.all(result.map(res => {
    const name = Object.keys(res)[0]
    return fs.readFile(path.resolve(publishedPath, name, 'index.md'), 'utf-8')
      .then(res => fmparse(res))
      .then(({ attributes, body }) => ({ ...attributes, readingtime: formatReadingTime(body) }))
  }))

  result = result.sort((a, b) => (a.date.getTime() < b.date.getTime()) ? 1 : -1)

  const generatedList = result.map(attr => ({ name: attr.slug }))

  fs.writeFile(path.resolve(publishedPath, 'index.js'), `/* eslint-disable */\n\nexport default ${JSON.stringify(generatedList)}`)
  fs.writeFile(path.resolve(__dirname, 'static/posts.published.json'), JSON.stringify(result))

  console.log('Done generate published post lists\n')
}

generatePostList()
