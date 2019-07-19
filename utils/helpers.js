import readingTime from 'reading-time'

export function formatPostDate(date) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') return date
  date = new Date(date)
  const args = [
    'en-EN',
    { day: 'numeric', month: 'long', year: 'numeric' }
  ].filter(Boolean)
  return `📆 ${date.toLocaleDateString(...args)}`
}

export function formatReadingTime(contents) {
  const { minutes } = readingTime(contents)
  const min = Math.round(minutes)
  const cups = Math.round(minutes / 5)
  return `
    ${new Array(cups || 1).fill('☕️').join('')}
    ${min > 1 ? `${min} min` : `${Math.round(minutes * 60)} sec`}
    to read
  `
}

export const metaGenerator = (type, meta) => [
  { hid: 'title', name: 'title', content: `${meta.title} | ${process.env.AUTHOR}` },
  { hid: 'description', name: 'description', content: `${meta.description}` },
  { hid: 'keywords', name: 'keywords', content: `sutan nst, sutan gading fadhillah nasution, sutan, gading, fadhillah, nasution, sgnzst, sutanlab, sutan lab, coder, mahasiswa, it polsri, itpolsri, polsri, politeknik negeri sriwijaya, ${meta.title}, ${meta.keywords}` },
  { hid: 'og:image', property: 'og:image', content: process.env.PRODUCTION_URL + meta.image },
  { hid: 'og:image:secure_url', property: 'og:image:secure_url', content: process.env.PRODUCTION_URL + meta.image },
  { hid: 'og:title', property: 'og:title', content: `${meta.title} | ${process.env.AUTHOR}` },
  { hid: 'og:description', property: 'og:description', content: meta.description },
  { hid: 'og:url', property: 'og:url', content: process.env.PRODUCTION_URL + meta.url },
  { hid: 'og:updated_time', property: 'og:updated_time', content: new Date().toISOString() },
  { hid: 'og:type', property: 'og:type', content: type },
  { hid: 'twitter:title', name: 'twitter:title', content: `${meta.title} | ${process.env.AUTHOR}` },
  { hid: 'twitter:image:src', name: 'twitter:image:src', content: process.env.PRODUCTION_URL + meta.url },
  { hid: 'twitter:description', name: 'twitter:description', content: meta.description },
  { hid: 'twitter:url', name: 'twitter:url', content: process.env.PRODUCTION_URL + meta.url }
]

export function debounce(func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const callNow = immediate && !timeout
    const later = () => {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
