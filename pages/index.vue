<template>
  <div class="content-page">
    <Banner height="70vh">
      <div class="text-center">
        <SlideLeft :duration="1500" :delay="200">
          <h1 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            <b>{{ author }}</b>
          </h1>
        </SlideLeft>
        <SlideRight :duration="1500" :delay="200">
          <h5 v-if="$store.getters['router/onMountedShow']" class="text-white text-smooth text-shadow">
            Just an ordinary Man who turns inspiration into beautiful codes.”
          </h5>
        </SlideRight>
      </div>
    </Banner>
    <section class="section section-skew">
      <div class="container">
        <Card class="card-content" shadow no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-content-image">
                  <Lazy tag="span">
                    <img data-src="/assets/img/collections/sutan_new.jpeg" class="rounded-circle" :alt="author">
                  </Lazy>
                </div>
              </div>
              <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                <div class="card-content-actions py-4 mt-lg-0">
                  <Button
                    tag="a"
                    target="_blank"
                    rel="noreferrer"
                    href="/media/cv.pdf"
                    type="info"
                    size="sm"
                    class="mr-4"
                  >
                    <client-only>
                      <md-briefcase-icon w="14px" h="14px" />
                    </client-only>
                    CV
                  </Button>
                  <Button
                    tag="a"
                    type="primary"
                    class="float-right"
                    size="sm"
                    :href="`mailto:${email}`"
                  >
                    <client-only>
                      <md-mail-icon w="14px" h="14px" />
                    </client-only>
                    Contact
                  </Button>
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-content-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">
                      <span>👨🏻‍💻</span>
                    </span>
                    <span class="description">Writer,</span>
                  </div>
                  <div>
                    <span class="heading">
                      <span>🧐</span>
                    </span>
                    <span class="description">Learner,</span>
                  </div>
                  <div>
                    <span class="heading">
                      <span>😴</span>
                    </span>
                    <span class="description">but Slacker</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                {{ authorFullname }}
              </h3>
              <div class="h6 font-weight-300">
                Gading, Since 1998
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

              <div class="row justify-content-center mt-5">
                <div class="col-lg-9">
                  <h2 class="text-smooth">
                    Support Me
                  </h2>
                  <p>
                    Do you like this website? Or do you like some stuff that I've made? <br>
                    You can support me by clicking on one of the buttons below.
                  </p>
                  <Support />
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
import MdMailIcon from 'vue-ionicons/dist/md-mail.vue'
import MdQuoteIcon from 'vue-ionicons/dist/md-quote.vue'
import Card from '~/components/Argon/Card'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'
import Lazy from '~/components/Base/Lazy'
import Support from '~/components/Base/Support'
import MountedAnimation from '~/mixins/mounted-animation'
import { metaGenerator } from '~/utils/helpers'
import { AUTHOR_NAME, AUTHOR_FULLNAME, EMAIL } from '~/utils/config'

export default {
  components: {
    SlideLeft,
    SlideRight,
    Banner,
    Card,
    Button,
    MdMailIcon,
    MdQuoteIcon,
    Lazy,
    MdBriefcaseIcon,
    Support
  },
  mixins: [MountedAnimation],
  data: () => ({
    author: AUTHOR_NAME,
    authorFullname: AUTHOR_FULLNAME,
    email: EMAIL
  }),
  head: () => ({
    title: `${AUTHOR_FULLNAME} | ${AUTHOR_NAME}`,
    meta: metaGenerator('website', {
      title: 'Personal Homepage',
      description: `A Man who turns a cup of coffee into beautiful codes. - ${AUTHOR_NAME}`,
      keywords: 'homepage, portfolio',
      image: '/assets/img/collections/desks/desk1.jpg',
      url: '/'
    })
  })
}
</script>
