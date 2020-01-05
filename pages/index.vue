<template>
  <div class="profile-page">
    <Banner>
      <div class="text-center">
        <SlideLeft :duration="1500" :delay="200">
          <h1 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            <b>Sutan Nasution.</b>
          </h1>
        </SlideLeft>
        <SlideRight :duration="1500" :delay="200">
          <h5 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            A Man who turns a cup of coffee into beautiful codes.”
          </h5>
        </SlideRight>
      </div>
    </Banner>
    <section class="section section-skew">
      <div class="container">
        <Card shadow class="card-profile" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <img v-lazy="'/assets/img/collections/sutan_new.jpeg'" class="rounded-circle" alt="Sutan Nasution">
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-profile-actions py-4 mt-lg-0">
                  <Button
                    tag="a"
                    target="_blank"
                    rel="noreferrer"
                    href="/media/resume-sutan-gading-fadhillah-nasution.pdf"
                    type="info"
                    size="sm"
                    class="mr-4"
                  >
                    <client-only>
                      <md-briefcase-icon w="14px" h="14px" />
                    </client-only>
                    Resume
                  </Button>
                  <Button
                    tag="a"
                    type="primary"
                    class="float-right"
                    size="sm"
                    href="mailto:sutan.gnst@gmail.com"
                  >
                    <client-only>
                      <md-mail-icon w="14px" h="14px" />
                    </client-only>
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
                Sutan Gading Fadhillah Nasution
              </h3>
              <div class="h6 font-weight-300">
                BSD City, Indonesia
              </div>
              <div class="h6 mt-4">
                Software Engineer, Frontend
              </div>
              <div>
                Orami Indonesia
              </div>
            </div>
            <div class="mt-5 py-4 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <h2 class="text-smooth">
                    About
                  </h2>
                  <p>
                    <client-only>
                      <md-quote-icon w="14px" h="14px" />
                    </client-only>
                    Software Engineer who specialized in frontend side, but have
                    an ability to code in backend side too. Very passionate about
                    modern mobile and web technology using JavaScript while taking into
                    consideration the latest trends and techniques.
                  </p>
                </div>
              </div>
              <h2 class="mt-5 text-smooth">
                Coding Activities
              </h2>
              <div class="row py-4">
                <div class="col-md-6">
                  <figure>
                    <embed src="https://wakatime.com/share/@7a831ab0-e43a-4215-aa08-92f915bed065/6309a505-c658-470e-a5ae-266aa8684053.svg">
                  </figure>
                </div>
                <div class="col-md-6">
                  <figure>
                    <embed src="https://wakatime.com/share/@7a831ab0-e43a-4215-aa08-92f915bed065/c584e591-eec6-4df1-81ad-e2930e1e5c6e.svg">
                  </figure>
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
import { SlideXLeftTransition as SlideLeft, SlideXRightTransition as SlideRight } from 'vue2-transitions'
import MdBriefcaseIcon from 'vue-ionicons/dist/md-briefcase.vue'
import MdHelpCircleOutlineIcon from 'vue-ionicons/dist/md-help-circle-outline.vue'
import MdMailIcon from 'vue-ionicons/dist/md-mail.vue'
import MdQuoteIcon from 'vue-ionicons/dist/md-quote.vue'
import Card from '~/components/Argon/Card'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'
import MountedAnimation from '~/mixins/mounted-animation'
import { metaGenerator } from '~/utils/helpers'

export default {
  components: {
    SlideLeft,
    SlideRight,
    Banner,
    Card,
    Button,
    MdMailIcon,
    MdQuoteIcon,
    MdHelpCircleOutlineIcon,
    MdBriefcaseIcon
  },
  mixins: [MountedAnimation],
  data: () => ({
    github: {
      ready: false,
      contributions: 0,
      publicRepos: 0,
      publicGists: 0
    }
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
  },
  head: () => ({
    title: `${process.env.AUTHOR}`,
    meta: metaGenerator('portfolio', {
      title: 'Personal Homepage',
      description: `A Man who turns a cup of coffee into beautiful codes. - ${process.env.AUTHOR}`,
      keywords: 'homepage, portfolio',
      image: '/icon.png',
      url: '/'
    })
  })
}
</script>
