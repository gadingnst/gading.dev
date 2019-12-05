<template>
  <div class="profile-page">
    <Banner height="480px" image="/assets/img/collections/desks/desk0.jpg">
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
          <div class="px-4 py-5 row justify-content-center">
            <div class="col-lg-9">
              <p>
                <client-only>
                  <md-quote-icon w="14px" h="14px" />
                </client-only>
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
                Careers
              </h2>
              <p>
                <b>Working as a Frontend Engineer at <i>Orami Indonesia</i>.</b>
              </p>

              <h2 class="mt-5">
                Activities
              </h2>
              <ul>
                <li>Learning and research some technology stuff from the internet.</li>
                <li>Coding, reading and blogging for fun.</li>
                <li>Making quality time for my family and girlfriend every weekend. (Umm, from phone maybe ?).</li>
              </ul>

              <h2 class="mt-5">
                My Stacks
              </h2>
              <ul>
                <li>React, Vue or other JavaScript framework for frontend stuff.</li>
                <li>REST or GraphQL for API usage.</li>
                <li>Node with Express for backend services.</li>
                <li>Sometimes using PHP with Laravel or Codeigniter as backend services.</li>
              </ul>

              <h2 class="mt-5">
                Software that i use
              </h2>
              <ul>
                <li>OS: Arch-based Linux</li>
                <li>Code Editor: Visual Studio Code</li>
                <li>Database GUI: DBEaver, PhpMyAdmin and Robo 3T</li>
                <li>Browsers: Google Chrome and Firefox</li>
                <li>Others: GIT Kraken, Spotify, XDMan & Advanced REST Client</li>
              </ul>

              <p class="mt-5">
                <i>Last updated at: December 5, 2019 from Tebet, South Jakarta. Indonesia</i>.
                &nbsp;<a href="https://github.com/sutanlab/sutanlab.id/commits/master/pages/now.vue">History</a>
              </p>
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
      title: 'Now Page',
      description: `What am i doing right now ? - ${process.env.AUTHOR}`,
      keywords: 'now',
      image: '/icon.png',
      url: '/now'
    })
  })
}
</script>
