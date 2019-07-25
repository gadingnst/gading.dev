import { readFile } from 'fs'
import { join } from 'path'

export const getContent = name => new Promise((resolve, reject) => {
  readFile(join(__dirname, `../contents/posts/${name}/index.md`), 'utf-8', (err, result) => {
    if (err) return reject(err)
    resolve(result)
  })
})
