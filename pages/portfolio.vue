<template>
  <div>
    <Banner height="450px" image="/assets/img/collections/desks/desk5.jpg">
      <div class="text-center">
        <h1 class="text-white text-smooth text-shadow">
          <b>Portfolio</b>
        </h1>
        <h5 class="text-white text-smooth text-shadow">
          Projects, experiments and some stuff i've made.”
        </h5>
      </div>
    </Banner>
    <section id="content-section" class="section section-lg py-3">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="row row-grid">
              <div v-for="(item, i) in portfolio" :key="i" class="col-lg-4 col-md-6 my-3">
                <Card class="border-0" hover shadow body-classes="pt-0 px-0">
                  <div v-lazy-container="{ selector: 'img' }">
                    <img
                      style="width: 100%; height: 200px; object-fit: cover"
                      class="card-pic card-img-top"
                      data-error="/assets/img/placeholders/error.png"
                      data-loading="/assets/img/placeholders/loading.gif"
                      :data-src="item.image || `/assets/img/collections/desks/desk${Math.floor(Math.random() * 7)}.jpg`"
                      :alt="item.name"
                    >
                  </div>
                  <div class="px-3 pt-4">
                    <h6 class="text-primary mb-1">
                      {{ item.name }}
                      <Badge type="default" class="text-uppercase ml-2">
                        {{ item.category }}
                      </Badge>
                    </h6>
                    <div class="content-desc">
                      <p class="description mt-3">
                        {{ wrapText(item.description, 125) }}
                      </p>
                    </div>
                    <div>
                      <Badge
                        v-for="(stack, j) in item.stacks"
                        :key="j"
                        type="primary"
                        rounded
                      >
                        {{ stack }}
                      </Badge>
                    </div>
                    <Button
                      tag="a"
                      type="default"
                      class="mt-4 mx-1 btn-sm"
                      style="float: right"
                      :href="item.github"
                    >
                      <no-ssr>
                        <logo-github-icon w="22px" h="22px" />
                      </no-ssr>
                    </Button>
                    <Button
                      tag="a"
                      type="primary"
                      class="mt-4 mx-1 btn-sm"
                      style="float: right"
                      :href="item.website"
                    >
                      <no-ssr>
                        <md-globe-icon w="22px" h="22px" />
                      </no-ssr>
                    </Button>
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
import MdGlobeIcon from 'vue-ionicons/dist/md-globe.vue'
import { wrapText, metaGenerator } from '~/utils/helpers'
import Card from '~/components/Argon/Card'
import Badge from '~/components/Argon/Badge'
import Banner from '~/components/Base/Banner'
import Button from '~/components/Argon/Button'

export default {
  components: {
    Card, Badge, Banner, Button, MdGlobeIcon
  },
  head: () => ({
    title: `Portfolio | ${process.env.AUTHOR}`,
    meta: metaGenerator('portfolio', {
      title: 'Portfolio',
      description: 'Some stuff made by Sutan Nasution.',
      keywords: 'portfolio, projects, experiments, stuff, technology, programming',
      image: '/icon.png',
      url: '/portfolio'
    })
  }),
  data: () => ({
    wrapText
  }),
  asyncData: () => (
    import('~/contents/portfolio')
      .then(({ default: portfolio }) => ({
        portfolio
      }))
  )
}
</script>
