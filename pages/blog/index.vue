<template>
  <div>
    <Banner height="450px" image="/assets/img/collections/desks/desk4.jpg">
      <div class="text-center">
        <h1 class="text-white text-smooth text-shadow" style="font-weight: 400">
          Blog
        </h1>
        <h5 class="text-white text-smooth text-shadow">
          Coding, Work, life and whatever i want
        </h5>
      </div>
    </Banner>
    <section class="section section-lg py-3">
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
                        Read more
                      </Button>
                    </nuxt-link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { wrapText, formatPostDate, formatReadingTime, metaGenerator } from '~/utils/helpers'
import Card from '~/components/Argon/Card'
import Badge from '~/components/Argon/Badge'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'
import Contents from '~/contents'

export default {
  components: {
    Card, Badge, Button, Banner
  },
  data: () => ({
    formatPostDate,
    wrapText
  }),
  head: () => ({
    title: `Blog | ${process.env.AUTHOR}`,
    meta: metaGenerator('blog', {
      title: 'Blog',
      description: 'A Journal about Sutan Nst, Coder',
      keywords: 'blogs, posts, articles',
      image: '/icon.png',
      url: '/blog'
    })
  }),
  asyncData: () => (
    Promise.all(Contents.map(async content => {
      content = await import(`~/contents/posts/${content.name}/index.md`)
      return {
        ...content.attributes,
        readingtime: formatReadingTime(content.body)
      }
    })).then(res => ({ contents: res.reverse() }))
  )
}
</script>

<style scoped>
@media (min-width: 992px) {
  .content-desc {
    height: 80px;
  }
}
</style>
