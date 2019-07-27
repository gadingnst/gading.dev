<template>
  <div class="profile-page">
    <Banner height="450px" image="/assets/img/collections/desks/desk0.jpg">
      <div class="text-center">
        <h1 class="text-white text-smooth text-shadow">
          <b>Now</b>
        </h1>
        <h5 class="text-white text-smooth text-shadow">
          What am i doing right now ?”
        </h5>
      </div>
    </Banner>
    <section class="section section-skew">
      <div class="container">
        <Card shadow class="card-profile" no-body>
          <div class="px-4">
            <div class="py-5">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <p>
                    <no-ssr>
                      <md-quote-icon w="14px" h="14px" />
                    </no-ssr>
                    At first, i'll be thanking to
                    <a href="https://108kb.io/blog/now/">Fariz Rizaldy</a>,
                    <a href="https://afrijaldzuhri.wordpress.com/now/">Afrijal Dzuhri</a> and
                    <a href="https://www.wahudamon.com/pages/now">Afwa Bagas Wahuda</a>.
                    &nbsp;Because all of them, i was inspired to create this page for describing about <b><i>what i'm doing right now</i></b>.
                    &nbsp;So, maybe you don't need to ask me frequently about that.
                  </p>
                  <p>
                    If you have your own site, maybe you should to make one, too.
                  </p>
                  <h2 class="mt-5">
                    Living place
                  </h2>
                  <p>
                    Palembang, South Sumatera. Indonesia
                  </p>
                  <h2 class="mt-5">
                    Careers
                  </h2>
                  <p>
                    Working as a final semester student who will soon become a graduate with an engineering degree.
                    Also working as Software Engineer <i>with Self Employed or Freelance</i>.
                  </p>
                  <h2 class="mt-5">
                    Activities
                  </h2>
                  <ul>
                    <li>Taking care of the requirements for my graduation.</li>
                    <li>Working on several projects to make some money.</li>
                    <li>Learning some stuff from the internet.</li>
                    <li>Making quality time for my family, girlfriend and friends every weekend.</li>
                    <li>Opening social media from my phone for a little entertainment and fun.</li>
                  </ul>
                  <h2 class="mt-5">
                    My Stacks
                  </h2>
                  <ul>
                    <li><i>Vue</i> or <i>Nuxt</i> with <i>PWA</i> technology for frontend stuff.</li>
                    <li><i>Node</i> with <i>Express</i> framework for backend services.</li>
                    <li>Sometimes using <i>PHP</i> with <i>Laravel</i> framework as backend services.</li>
                    <li><i>React</i>, but still learning about its hooks and ecosystem.</li>
                  </ul>
                  <p class="mt-5">
                    <i>Last updated at: July 27, 2019 22:00 from Sekip Ujung, Palembang. Indonesia</i>.
                    &nbsp;<a href="https://github.com/sutanlab/sutanlab.id/commits/master/pages/now.vue">History</a>
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
import MdQuoteIcon from 'vue-ionicons/dist/md-quote.vue'
import Card from '~/components/Argon/Card'
import Banner from '~/components/Base/Banner'
import { metaGenerator } from '~/utils/helpers'

export default {
  components: {
    Banner,
    Card,
    MdQuoteIcon
  },
  head: () => ({
    title: `Now | ${process.env.AUTHOR}`,
    meta: metaGenerator('article', {
      title: `Now Page`,
      description: `What am i doing right now ? - ${process.env.AUTHOR}`,
      keywords: 'now',
      image: '/icon.png',
      url: '/now'
    })
  })
}
</script>
