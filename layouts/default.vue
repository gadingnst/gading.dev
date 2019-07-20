<template>
  <div>
    <Navbar />
    <FadeTransition :duration="800">
      <Nuxt />
    </FadeTransition>
    <Footer />
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import Navbar from '~/components/Base/Navbar'
import Footer from '~/components/Base/Footer'

export default {
  components: {
    FadeTransition,
    Navbar,
    Footer
  },
  watch: {
    $route() {
      this.$store.commit('router/watchRoutes', this.$route.name)
    }
  },
  beforeCreate() {
    this.$store.commit('router/watchRoutes', this.$route.name)
  }
}
</script>
