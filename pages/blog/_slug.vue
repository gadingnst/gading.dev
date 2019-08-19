<template>
  <div>
    <link v-for="(source, i) in meta.css_source" :key="i" rel="stylesheet" :href="source">
    <script v-for="(source, i) in meta.js_source" :key="i" type="text/javascript" :src="source" />
    <Banner height="450px" :image="meta.image">
      <div class="text-center">
        <h4 id="content-title" class="text-white text-smooth text-shadow" style="font-weight: 400">
          <b style="border-bottom: 2px solid white">{{ meta.title }}</b>
        </h4>
        <h5 class="text-white text-smooth text-shadow">
          {{ meta.description }}”
        </h5>
        <div id="content-meta" class="px-2 mt-4 text-shadow">
          <span>
            {{ formatPostDate(meta.date) }}
          </span>
          &nbsp;•&nbsp;
          <span>
            {{ meta.readingtime }}
          </span>
        </div>
      </div>
    </Banner>
    <div class="container-fluid px-0">
      <ContentParser
        class="py-4"
        :render-fn="renderFn"
        :static-render-fn="staticRenderFn"
      />
    </div>
    <div class="container" style="border-top: 1.5px solid rgba(0, 0, 0, 0.2)">
      <div class="row pb-3 justify-content-center">
        <div class="col-lg-10 order-lg-2 text-center">
          <h3 class="mb-3 pt-4">
            <b>Share</b>
          </h3>
          <Button
            v-for="(item, i) in socialShares"
            :key="i"
            outline
            rounded
            size="lg"
            :type="item.type"
            :aria-label="item.label"
            :title="item.label"
            @click="share(item.link, item.label)"
          >
            <no-ssr>
              <component :is="item.icon" w="26px" h="26px" />
            </no-ssr>
          </Button>
        </div>
      </div>
      <Disqus
        :title="`${meta.title} | ${env.author}`"
        :url="`${env.url}/blog/${meta.slug}`"
        :identifier="`${meta.slug}-${new Date(meta.date).getTime()}`"
      />
    </div>
  </div>
</template>

<script>
import { formatPostDate, formatReadingTime, metaGenerator } from '~/utils/helpers'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'
import ContentParser from '~/components/Blog/ContentParser'
import Disqus from '~/components/Blog/Disqus'

export default {
  components: {
    Button, Banner, ContentParser, Disqus
  },
  data: () => ({
    formatPostDate,
    twitterUsername: 'sutan_gnst',
    socialShares: [],
    env: {
      url: process.env.PRODUCTION_URL,
      author: process.env.AUTHOR
    }
  }),
  head() {
    return {
      title: `${this.meta.title} | ${this.env.author}`,
      meta: [
        ...metaGenerator('article', {
          title: this.meta.title,
          description: this.meta.description,
          keywords: this.meta.keywords,
          url: `/blog/${this.meta.slug}`,
          image: this.meta.image
        }),
        { hid: 'article:published_time', property: 'article:published_time', content: new Date(this.meta.date).toISOString() },
        { hid: 'article:section', property: 'article:section', content: this.meta.category }
      ]
    }
  },
  asyncData: async ({ params }) => {
    const content = await import(`~/contents/posts/published/${params.slug}/index.md`)
    return {
      meta: {
        ...content.attributes,
        readingtime: formatReadingTime(content.body)
      },
      renderFn: content.vue.render,
      staticRenderFn: content.vue.staticRenderFns
    }
  },
  mounted() {
    this.$data.socialShares = [
      {
        icon: 'logo-facebook-icon',
        type: 'primary',
        label: 'Share on Facebook',
        link: `https://www.facebook.com/sharer/sharer.php?u=${this.env.url}/blog/${this.meta.slug}`
      },
      {
        icon: 'logo-twitter-icon',
        type: 'info',
        label: 'Share on Twitter',
        link: `https://twitter.com/intent/tweet?text=%22${this.meta.caption}%22%20${this.env.url}/blog/${this.meta.slug}%20via%20%40${this.twitterUsername}&hashtags=${this.meta.tags.reduce((acc, cur) => `${acc},${cur}`)}`
      },
      {
        icon: 'logo-whatsapp-icon',
        type: 'success',
        label: 'Share on Whatsapp',
        link: `https://${this.$store.getters.mobile.anyMobile() ? 'api' : 'web'}.whatsapp.com/send?text=%22${this.meta.caption}%22%0A%0A${this.env.url}/blog/${this.meta.slug}`
      }
    ]
  },
  methods: {
    share(link, target) {
      window.open(link, target, 'width=600,height=600')
      return false
    }
  }
}
</script>

<style>
#content-meta {
  font-size: 0.9rem;
  font-weight: 500;
}
@media (min-width: 768px) {
  #content-title {
    font-size: 2rem;
  }
}
</style>
