<template>
  <div>
    <Banner height="450px" image="/assets/img/collections/desks/desk4.jpg">
      <div class="text-center">
        <h1 class="text-white text-smooth text-shadow">
          <b>Blog</b>
        </h1>
        <h5 class="text-white text-smooth text-shadow">
          Coding, work, life and whatever i want.”
        </h5>
      </div>
    </Banner>
    <section id="content-section" class="section section-lg py-3">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div v-for="(content, i) in contents" :key="i" class="col-lg-6 my-3">
                <Card class="border-0" hover shadow body-classes="pt-0 px-0">
                  <img v-lazy="content.image" style="width: 100%; height: 200px; object-fit: cover" class="card-img-top" :alt="content.title">
                  <div class="px-3 pt-4">
                    <h6 class="text-primary mb-1">
                      {{ content.title }}
                      <Badge type="primary" class="text-uppercase ml-2">
                        {{ content.category }}
                      </Badge>
                    </h6>
                    <div class="text-muted" style="font-size: 9pt">
                      <span>
                        {{ formatPostDate(content.date) }}
                      </span>
                      &nbsp;•&nbsp;
                      <span>
                        {{ content.readingtime }}
                      </span>
                    </div>
                    <div class="content-desc">
                      <p class="description mt-3">
                        {{ wrapText(content.description, 150) }}
                      </p>
                    </div>
                    <div>
                      <Badge
                        v-for="(tag, iTag) in content.tags"
                        :key="iTag"
                        type="info"
                        rounded
                      >
                        #{{ tag }}
                      </Badge>
                    </div>
                    <nuxt-link :to="`/blog/${content.slug}`">
                      <Button type="primary" class="mt-4" style="float: right">
                        Read
                      </Button>
                    </nuxt-link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-4">
          <h4 class="text-center">
            Page {{ page }} of {{ Math.ceil(total / pagination.limit) }}
          </h4>
          <Pagination
            v-model="pg"
            align="center"
            class="mt-3"
            :page-count="Math.ceil(total / pagination.limit)"
            @input="onPageChange"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { wrapText, formatPostDate, metaGenerator } from '~/utils/helpers'
import Pagination from '~/components/Argon/Pagination'
import Card from '~/components/Argon/Card'
import Badge from '~/components/Argon/Badge'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'

export default {
  components: {
    Card, Badge, Button, Banner, Pagination
  },
  props: {
    contents: {
      type: Array,
      default: () => [{}]
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    formatPostDate,
    wrapText,
    pagination: {
      limit: process.env.BLOG_PAGINATION_LIMIT
    }
  }),
  head: () => ({
    title: `Blog | ${process.env.AUTHOR}`,
    meta: metaGenerator('blog', {
      title: 'Blog',
      description: 'A Journal about Sutan Nasution.',
      keywords: 'blogs, posts, articles',
      image: '/icon.png',
      url: '/blog'
    })
  }),
  computed: {
    pg: {
      get() { return this.page },
      set(val) { this.$emit('update:page', val) }
    }
  },
  methods: {
    onPageChange(val) {
      if (val === 1) {
        this.$router.push(`/blog`)
      } else {
        this.$router.push(`/blog/page/${val}`)
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 992px) {
  .content-desc {
    height: 80px;
  }
}
</style>
