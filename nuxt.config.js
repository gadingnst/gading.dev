import fileSystem from 'fs'
import path from 'path'
import fmparse from 'front-matter'
import mdi from 'markdown-it'
import mode from 'frontmatter-markdown-loader/mode'
import { config as env } from 'dotenv'
import { range } from './utils/helpers'
import posts from './contents/posts/published'
import {
  PRODUCTION_URL,
  SITE_NAME,
  AUTHOR_NAME,
  AUTHOR_FULLNAME,
  TWITTER_USERNAME,
  EMAIL,
  BLOG_PAGINATION_LIMIT,
  ACTIVATE_ADS
} from './utils/config'

env({ path: '.env' })

const fs = fileSystem.promises
const md = mdi({ html: true, linkify: true, typographer: true })

const routes = () => {
  const routes = []

  // slug routes
  posts.forEach(item => routes.push(`/blog/${item.name}`))

  // pagination routes
  range(1, Math.ceil(posts.length / BLOG_PAGINATION_LIMIT))
    .forEach(num => routes.push(`/blog/page/${num}`))

  return routes
}

const routesSitemap = routes => (
  routes.map(route => ({
    url: `${route}/`,
    changefreq: 'daily',
    priority: 1,
    lastmodISO: String(new Date().toISOString())
  }))
)

const config = {
  target: 'static',

  env: {
    ...process.env
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  /*
  ** Headers of the page
  */
  head: {
    title: SITE_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#304165' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: SITE_NAME },
      { name: 'google-site-verification', content: 'eGOhdZjNeSLIBtMneyjMwoE3fg4c4-v4okvoqNf4ZlQ' },
      { name: 'author', content: AUTHOR_FULLNAME },
      { name: 'profile:username', content: SITE_NAME.toLowerCase() },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: `@${TWITTER_USERNAME}` },
      { name: 'twitter:site', content: `@${TWITTER_USERNAME}` },
      { property: 'og:site_name', content: SITE_NAME }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://onesignal.com' },
      { rel: 'preconnect', href: 'https://cdn.onesignal.com' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript :)', body: true }
    ]
  },

  generate: {
    // generate config
    routes: routes()
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: PRODUCTION_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    routes: routesSitemap(routes())
  },

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: `Blog | ${AUTHOR_NAME}`,
          link: `${PRODUCTION_URL}/feed.xml`,
          description: `${AUTHOR_NAME}'s personal blog feed`
        }

        feed.addCategory('Personal Blog')

        feed.addContributor({
          name: AUTHOR_NAME,
          email: EMAIL,
          link: PRODUCTION_URL
        })

        await Promise.all(posts.map(({ name }) => (
          fs.readFile(path.resolve(__dirname, `contents/posts/published/${name}/index.md`), 'utf-8')
            .then(result => fmparse(result))
            .then(({ attributes, html }) => ({ ...attributes, html }))
            .then(content => {
              feed.addItem({
                title: content.title,
                link: `${PRODUCTION_URL}/blog/${content.slug}`,
                description: content.description
              })
            })
        )))
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2'
    }
  ],

  /*
  ** Customize the progress-bar color
  */
  loading: {
    continuous: true,
    height: '2.5px',
    color: '#11CDEF'
  },

  pwa: {
    manifest: {
      name: SITE_NAME,
      short_name: SITE_NAME,
      theme_color: '#fff'
    },
    workbox: {
      offlineAnalytics: true,
      runtimeCaching: [
        {
          urlPattern: 'https://sutanlab.id/_nuxt/*',
          handler: 'cacheFirst',
          method: 'GET'
        },
        {
          urlPattern: 'https://sutanlab.id/assets/*',
          handler: 'cacheFirst',
          method: 'GET'
        },
        {
          urlPattern: 'https://sutanlab.id/media/*',
          handler: 'cacheFirst',
          method: 'GET'
        },
        {
          urlPattern: 'https://onesignal.com/*',
          handler: 'cacheFirst',
          method: 'GET'
        },
        {
          urlPattern: 'https://cdn.onesignal.com/*',
          handler: 'cacheFirst',
          method: 'GET'
        },
        {
          urlPattern: 'https://www.google-analytics.com/*',
          handler: 'cacheFirst',
          method: 'GET'
        }
      ]
    }
  },

  oneSignal: {
    init: {
      appId: process.env.ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false
      }
    }
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/fonts.scss',
    '~/assets/style/dark.scss',
    '~/assets/style/main.scss',
    '~/assets/style/code.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/plugins/index', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    '@nuxtjs/feed',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-analytics',
      { id: process.env.GOOGLE_ANALYTICS_ID }
    ]
  ],

  /*
  ** Build configuration
  */
  build: {
    maxChunkSize: 100000,
    extractCSS: true,

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        include: path.resolve(__dirname, 'contents'),
        options: {
          mode: [mode.BODY, mode.VUE_RENDER_FUNCTIONS],
          markdown: body => {
            md.use(require('markdown-it-attrs'))
            md.use(require('markdown-it-plugin-data-src'))
            return md.render(body)
          },
          vue: {
            root: 'posts'
          }
        }
      })
    }
  }
}

if (ACTIVATE_ADS) {
  config.modules.push([
    '@nuxtjs/google-adsense',
    {
      id: process.env.GOOGLE_ADSENSE_ID,
      pageLevelAds: true
    }
  ])
}

if (process.env.NODE_ENV !== 'development') {
  config.build.optimization = {
    minimize: true,
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      name: true,
      cacheGroups: {},
      minSize: 100000,
      maxSize: 100000
    }
  }
}

export default config
