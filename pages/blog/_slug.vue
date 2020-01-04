<template>
  <div class="profile-page">
    <link v-for="(source, i) in meta.css_source" :key="i" rel="stylesheet" :href="source">
    <script v-for="(source, i) in meta.js_source" :key="i" type="text/javascript" :src="source" />
    <Banner height="480px" :image="meta.image">
      <div id="banner-content" class="text-center">
        <SlideUp :duration="1500" :delay="200">
          <h4 v-if="isShow" id="content-title" class="text-white text-smooth text-shadow" style="font-weight: 400">
            <b style="border-bottom: 2px solid white">{{ meta.title }}</b>
          </h4>
        </SlideUp>
        <SlideDown :duration="1500" :delay="200">
          <h5 v-if="isShow" id="content-description" class="text-white text-smooth text-shadow">
            {{ meta.description }}”
          </h5>
        </SlideDown>
        <FadeIn :duration="1500" :delay="500">
          <div v-if="isShow" id="content-meta" class="px-2 mt-4 text-shadow">
            <span>
              {{ formatPostDate(meta.date) }}
            </span>
            &nbsp;•&nbsp;
            <span>
              {{ meta.readingtime }}
            </span>
          </div>
        </FadeIn>
      </div>
    </Banner>
    <section
      v-lazy-container="{
        selector: 'img',
        loading: '/assets/img/placeholders/loading.svg',
        error: '/assets/img/placeholders/error.png'
      }"
      class="container-fluid"
    >
      <div id="content-wrap" style="margin: auto">
        <Card shadow class="card-profile" style="margin-top: -85px" no-body>
          <ContentParser
            class="py-5"
            :render-fn="renderFn"
            :static-render-fn="staticRenderFn"
          />
        </Card>
      </div>
    </section>
    <div class="container mt-3">
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
            <client-only>
              <component :is="item.icon" w="26px" h="26px" />
            </client-only>
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
import { mapGetters } from 'vuex'
import {
  FadeTransition as FadeIn,
  SlideYUpTransition as SlideUp,
  SlideYDownTransition as SlideDown
} from 'vue2-transitions'
import MountedAnimation from '~/mixins/mounted-animation'
import { formatPostDate, formatReadingTime, metaGenerator } from '~/utils/helpers'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'
import Card from '~/components/Argon/Card'
import ContentParser from '~/components/Blog/ContentParser'
import Disqus from '~/components/Blog/Disqus'

export default {
  components: {
    FadeIn,
    SlideUp,
    SlideDown,
    Card,
    Button,
    Banner,
    ContentParser,
    Disqus
  },
  mixins: [MountedAnimation],
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
  data: () => ({
    formatPostDate,
    twitterUsername: 'sutan_gnst',
    socialShares: [],
    env: {
      url: process.env.PRODUCTION_URL,
      author: process.env.AUTHOR
    }
  }),
  computed: {
    ...mapGetters({
      isShow: 'router/onMountedShow'
    })
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
  },
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
  }
}
</script>

<style scoped>
#content-meta {
  font-size: 0.9rem;
  font-weight: 500;
}

@media (min-width: 768px) {
  #content-title {
    font-size: 2rem;
  }
  #banner-content {
    width: 85%;
  }
  #content-description {
    margin: auto;
    max-width: 80%;
  }
  #content-wrap {
    max-width: 960px
  }
}
</style>
