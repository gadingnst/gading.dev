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
  </div>
</template>

<script>
import { wrapText, metaGenerator } from '~/utils/helpers'
import Card from '~/components/Argon/Card'
import Badge from '~/components/Argon/Badge'
import Button from '~/components/Argon/Button'
import Banner from '~/components/Base/Banner'

export default {
  components: {
    Card, Badge, Button, Banner
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
  })
}
</script>
