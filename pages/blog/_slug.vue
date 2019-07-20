<template>
  <div>
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
  </div>
</template>

<script>
import { formatPostDate, formatReadingTime, metaGenerator } from '~/utils/helpers'
import Banner from '~/components/Base/Banner'
import ContentParser from '~/components/Blog/ContentParser'

export default {
  components: {
    Banner, ContentParser
  },
  data: () => ({
    formatPostDate,
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
    const content = await import(`~/contents/posts/${params.slug}/index.md`)
    return {
      meta: {
        ...content.attributes,
        readingtime: formatReadingTime(content.body)
      },
      renderFn: content.vue.render,
      staticRenderFn: content.vue.staticRenderFns
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
