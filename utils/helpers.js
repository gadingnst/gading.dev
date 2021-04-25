import readingTime from 'reading-time'
import { PRODUCTION_URL, SITE_NAME, AUTHOR_NAME } from './config'

export const wrapText = (text, max) =>
  text.length > max ? `${text.slice(0, max).trim()} ...` : text

export const range = (start, end) =>
  start === end ? [start] : [start, ...range(start + 1, end)]

export const invert = obj =>
  Object.assign({}, ...Object.entries(obj).map(([key, value]) => ({ [value]: key })))

export const formatPostDate = date => {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date
  }
  date = new Date(date)
  const args = [
    'en-ID',
    { day: 'numeric', month: 'long', year: 'numeric' }
  ].filter(Boolean)
  return `📆 ${date.toLocaleDateString(...args)}`
}

export const formatReadingTime = contents => {
  const { minutes, text } = readingTime(contents)
  const cups = Math.round(minutes / 5)
  return `${new Array(cups || 1).fill('☕️').join('')} ${text}`
}

export const randomString = (length = 7) => {
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  return range(0, length)
    .map(() => possibleChars.charAt(Math.floor(Math.random() * possibleChars.length)))
    .join('')
}

export const metaGenerator = (type, meta) => [
  { name: 'title', content: `${meta.title} | ${AUTHOR_NAME}` },
  { name: 'description', content: `${meta.description}` },
  { name: 'keywords', content: `sutan nst, sutan nasution, sutan gading, sutan gading fadhillah nasution, sutan, gading, fadhillah, nasution, sgnzst, sutanlab, sutan lab, coder, mahasiswa, it polsri, itpolsri, polsri, politeknik negeri sriwijaya, ${meta.title}, ${meta.keywords}` },
  { name: 'twitter:title', content: `${meta.title} | ${PRODUCTION_URL}` },
  { name: 'twitter:image', content: PRODUCTION_URL + meta.image },
  { name: 'twitter:description', content: meta.description },
  { name: 'twitter:url', content: PRODUCTION_URL + meta.url },
  { property: 'og:type', content: type },
  { property: 'og:title', content: `${meta.title} | ${AUTHOR_NAME}` },
  { property: 'og:description', content: meta.description },
  { property: 'og:url', content: PRODUCTION_URL + meta.url },
  { property: 'og:site_name', content: SITE_NAME },
  { property: 'og:image', content: PRODUCTION_URL + meta.image },
  { property: 'og:image:secure_url', content: PRODUCTION_URL + meta.image },
  { property: 'og:updated_time', content: new Date().toISOString() }
]
