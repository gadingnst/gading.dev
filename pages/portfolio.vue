<template>
  <div>
    <Banner image="/assets/img/collections/desks/desk5.jpg">
      <div class="text-center">
        <SlideLeft :duration="1500" :delay="200">
          <h1 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            <b>Portfolio</b>
          </h1>
        </SlideLeft>
        <SlideRight :duration="1500" :delay="200">
          <h5 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            Projects, experiments and some stuff i've made.”
          </h5>
        </SlideRight>
      </div>
    </Banner>
    <section id="content-section" class="section section-lg py-3">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <Lazy class="row row-grid">
              <div v-for="(item, i) in portfolio" :key="i" class="col-lg-4 col-md-6 my-3">
                <Card class="border-0 h-100" hover shadow body-classes="pt-0 px-0" footer-classes="pt-0">
                  <img
                    style="width: 100%; height: 200px; object-fit: contain"
                    class="card-pic card-img-top"
                    :data-src="item.image || `/assets/img/collections/desks/desk${Math.floor(Math.random() * 7)}.jpg`"
                    :alt="item.name"
                  >
                  <div class="px-3 pt-4">
                    <h6 class="text-primary mb-1">
                      {{ item.name }}
                      <Badge type="default" class="text-uppercase ml-2">
                        {{ item.category }}
                      </Badge>
                    </h6>
                    <div class="content-desc">
                      <p class="description mt-3">
                        {{ wrapText(item.description, 200) }}
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
                  </div>
                  <template #footer>
                    <Button
                      tag="a"
                      type="default"
                      class="mt-4 mx-1 btn-sm"
                      style="float: right"
                      :href="item.github"
                    >
                      <client-only>
                        <logo-github-icon w="22px" h="22px" />
                      </client-only>
                    </Button>
                    <Button
                      tag="a"
                      type="primary"
                      class="mt-4 mx-1 btn-sm"
                      style="float: right"
                      :href="item.website"
                    >
                      <client-only>
                        <md-globe-icon w="22px" h="22px" />
                      </client-only>
                    </Button>
                  </template>
                </Card>
              </div>
            </Lazy>
          </div>
        </div>
      </div>
      <hr class="mt-5" style="width: 75%">
      <div class="row justify-content-center text-center mx-3 py-1">
        <div class="col-lg-9">
          <h2><b>Support Me</b></h2>
          <p>
            <client-only>
              <md-quote-icon w="14px" h="14px" />
            </client-only>
            Do you love some stuff that I've made? <br>
            You can support me by clicking on one of the buttons below.
          </p>
          <Support />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { SlideXLeftTransition as SlideLeft, SlideXRightTransition as SlideRight } from 'vue2-transitions'
import MdGlobeIcon from 'vue-ionicons/dist/md-globe.vue'
import LogoGithubIcon from 'vue-ionicons/dist/logo-github.vue'
import MountedAnimation from '~/mixins/mounted-animation'
import { wrapText, metaGenerator } from '~/utils/helpers'
import Card from '~/components/Argon/Card'
import Badge from '~/components/Argon/Badge'
import Banner from '~/components/Base/Banner'
import Button from '~/components/Argon/Button'
import Lazy from '~/components/Base/Lazy'
import Support from '~/components/Base/Support'

export default {
  components: {
    SlideRight,
    SlideLeft,
    Card,
    Badge,
    Banner,
    Button,
    Lazy,
    Support,
    MdGlobeIcon,
    LogoGithubIcon
  },
  mixins: [MountedAnimation],
  asyncData: () => (
    import('~/contents/portfolio')
      .then(({ default: portfolio }) => ({
        portfolio
      }))
  ),
  data: () => ({
    wrapText
  }),
  head: () => ({
    title: `Portfolio | ${process.env.AUTHOR}`,
    meta: metaGenerator('portfolio', {
      title: 'Portfolio',
      description: 'Some stuff made by Sutan Nasution.',
      keywords: 'portfolio, projects, experiments, stuff, technology, programming',
      image: '/icon.png',
      url: '/portfolio'
    })
  })
}
</script>
