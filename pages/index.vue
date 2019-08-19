<template>
  <div class="profile-page">
    <Banner>
      <div class="text-center">
        <h1 class="text-white text-smooth text-shadow">
          <b>Sutan Nasution.</b>
        </h1>
        <h5 class="text-white text-smooth text-shadow">
          A Man who turns a cup of coffee into beautiful codes.”
        </h5>
      </div>
    </Banner>
    <section class="section section-skew">
      <div class="container">
        <Card shadow class="card-profile" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#me" aria-hidden="true">
                    <img v-lazy="'/assets/img/collections/sutan_new.jpeg'" class="rounded-circle" alt="Sutan Nasution">
                  </a>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                  <Button
                    tag="a"
                    target="_blank"
                    rel="noreferrer"
                    href="/media/my-resume.pdf"
                    type="info"
                    size="sm"
                    class="mr-4"
                  >
                    <no-ssr>
                      <md-briefcase-icon w="14px" h="14px" />
                    </no-ssr>
                    Resume
                  </Button>
                  <Button
                    tag="a"
                    type="primary"
                    class="float-right"
                    size="sm"
                    href="mailto:sutan.gnst@gmail.com"
                  >
                    <no-ssr>
                      <md-mail-icon w="14px" h="14px" />
                    </no-ssr>
                    Contact
                  </Button>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">
                      <span v-if="github.ready">{{ github.contributions }}</span>
                      <md-help-circle-outline-icon v-else w="18px" h="18px" animate="beat" />
                    </span>
                    <span class="description">Contributions</span>
                  </div>
                  <div>
                    <span class="heading">
                      <span v-if="github.ready">{{ github.publicRepos }}</span>
                      <md-help-circle-outline-icon v-else w="18px" h="18px" animate="beat" />
                    </span>
                    <span class="description">Repositories</span>
                  </div>
                  <div>
                    <span class="heading">
                      <span v-if="github.ready">{{ github.publicGists }}</span>
                      <md-help-circle-outline-icon v-else w="18px" h="18px" animate="beat" />
                    </span>
                    <span class="description">Gists</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                Sutan Nasution.,
                <span class="font-weight-light">&nbsp;20</span>
              </h3>
              <div class="h6 font-weight-300">
                Palembang, Indonesia
              </div>
              <div class="h6 mt-4">
                Software Engineer
              </div>
              <div>
                State of Polytechnic Sriwijaya
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <p>
                    <no-ssr>
                      <md-quote-icon w="14px" h="14px" />
                    </no-ssr>
                    My name is Sutan Gading Fadhillah Nasution. My age is approaching 20 years. Now, i'm lives in Palembang, Indonesia. I still lives with my parents and currently studying at the State of Polytechnic Sriwijaya.
                  </p>
                  <p>
                    I am very interested in Programming, especially in building a website applications. Actually, I'm not very experienced in programming, but I will continue to learn and aspiring to become a Professional Developer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  </div>
</template>

<script>
import MdBriefcaseIcon from 'vue-ionicons/dist/md-briefcase.vue'
import MdHelpCircleOutlineIcon from 'vue-ionicons/dist/md-help-circle-outline.vue'
import MdMailIcon from 'vue-ionicons/dist/md-mail.vue'
import MdQuoteIcon from 'vue-ionicons/dist/md-quote.vue'
import Card from '~/components/Argon/Card'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'
import { metaGenerator } from '~/utils/helpers'

export default {
  components: {
    Banner,
    Card,
    Button,
    MdMailIcon,
    MdQuoteIcon,
    MdHelpCircleOutlineIcon,
    MdBriefcaseIcon
  },
  data: () => ({
    github: {
      ready: false,
      contributions: 0,
      publicRepos: 0,
      publicGists: 0
    }
  }),
  head: () => ({
    title: `${process.env.AUTHOR}`,
    meta: metaGenerator('portfolio', {
      title: `Personal Homepage`,
      description: `A Man who turns a cup of coffee into beautiful codes. - ${process.env.AUTHOR}`,
      keywords: 'homepage, portfolio',
      image: '/icon.png',
      url: '/'
    })
  }),
  mounted() {
    Promise.all([
      window.fetch('https://api.github.com/users/sutanlab')
        .then(res => res.json())
        .then(res => res),
      window.fetch('https://github-contributions-api.now.sh/v1/sutanlab')
        .then(res => res.json())
        .then(({ years }) => years.reduce((acc, cur) => acc + cur.total, 0))
    ]).then(result => {
      this.github.ready = true
      this.github.publicRepos = result[0].public_repos
      this.github.publicGists = result[0].public_gists
      this.github.contributions = result[1]
    })
  }
}
</script>
