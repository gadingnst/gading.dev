import fileSystem from 'fs'
import path from 'path'
import fmparse from 'front-matter'
import mdi from 'markdown-it'
import mode from 'frontmatter-markdown-loader/mode'
import posts from './contents/posts/published'

require('dotenv').config({ path: '.env' })

const fs = fileSystem.promises
const md = mdi({ html: true, linkify: true, typographer: true })

const settings = {
  author: 'Sutan Nasution.',
  productionUrl: 'https://sutanlab.id',
  blogPaginationLimit: 6
}

function routes() {
  const routes = []

  // slug routes
  for (const item of posts) {
    routes.push(`/blog/${item.name}`)
  }

  // pagination routes
  for (let i = 0; i < Math.ceil(posts.length / settings.blogPaginationLimit); i++) {
    routes.push(`/blog/page/${i + 1}`)
  }

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

export default {
  mode: 'universal',

  env: {
    AUTHOR: settings.author,
    PRODUCTION_URL: settings.productionUrl,
    BLOG_PAGINATION_LIMIT: settings.blogPaginationLimit,

    ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID
  },

  server: {
    host: '0.0.0.0',
    port: 3000
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Sutanlab',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#304165' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-title', content: 'Sutanlab' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:creator', content: '@sutan_gnst' },
      { name: 'twitter:site', content: '@sutan_gnst' },
      { property: 'og:site_name', content: 'Sutanlab' },
      { property: 'profile:username', content: 'sutanlab' },
      { name: 'google-site-verification', content: 'eGOhdZjNeSLIBtMneyjMwoE3fg4c4-v4okvoqNf4ZlQ' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,700|Courgette' },
      { rel: 'stylesheet', href: '/assets/css/argon.min.css' }
    ],
    noscript: [
      { innerHTML: 'This website requires JavaScript :)', body: true }
    ]
  },

  router: {
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        let position = {}
        if (to.matched.length < 2) {
          position = { x: 0, y: 0 }
        } else if (
          to.matched.some(r => r.components.default.options.scrollToTop)
        ) {
          position = { x: 0, y: 0 }
        }
        if (to.hash) {
          position = { selector: to.hash }
        }
        return position
      }
    }
  },

  generate: {
    // generate config
    routes: routes()
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: settings.productionUrl,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    routes: routesSitemap(routes())
  },

  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: `Blog | ${settings.author}`,
          link: `${settings.productionUrl}/feed.xml`,
          description: 'Sutan Nasution.\'s personal blog feed'
        }

        feed.addCategory('Personal Blog')

        feed.addContributor({
          name: 'Sutan Nasution.',
          email: 'sutan.gnst@gmail.com',
          link: settings.productionUrl
        })

        await Promise.all(posts.map(({ name }) => (
          fs.readFile(path.resolve(__dirname, `contents/posts/published/${name}/index.md`), 'utf-8')
            .then(result => fmparse(result))
            .then(({ attributes, html }) => ({ ...attributes, html }))
            .then(content => {
              feed.addItem({
                title: content.title,
                link: `${settings.productionUrl}/blog/${content.slug}`,
                description: content.description,
                content: content.html
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
      name: 'Sutanlab',
      short_name: 'Sutanlab'
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
    '~/assets/style/highlight.scss',
    '~/assets/style/ionicons.scss',
    '~/assets/style/global.scss'
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
      { id: 'UA-135036153-1' }
    ]
  ],

  /*
  ** Build configuration
  */
  build: {
    maxChunkSize: 100000,
    extractCSS: true,

    optimization: {
      minimize: true,
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        name: true,
        cacheGroups: {},
        minSize: 100000,
        maxSize: 100000
      }
    },

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
