<template>
  <div>
    <Navbar />
    <FadeTransition :duration="1000">
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
      this.$store.commit('router/toggleMountedShow', false)
    }
  },
  beforeCreate() {
    this.$store.commit('router/watchRoutes', this.$route.name)
  },
  mounted() {
    this.$store.dispatch('getPosts')
  }
}
</script>
