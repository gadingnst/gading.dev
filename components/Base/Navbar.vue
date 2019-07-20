<template>
  <BaseNav
    id="navbar"
    :style="transparent ? `background-color: transparent !important;` : ''"
    class="fixed-top"
    type="default"
    effect="dark"
    expand
  >
    <nuxt-link
      slot="brand"
      :class="`display-4 text-white mr-lg-5 text-smooth ${transparent ? 'text-shadow' : ''}`"
      to="/"
    >
      Sutanlab
    </nuxt-link>
    <div slot="content-header" slot-scope="{closeMenu}" class="row">
      <div class="col-6 collapse-brand">
        <nuxt-link to="/" class="text-smooth" style="color: black">
          <img src="/icon.png" alt="Sutanlab">
          <span>Sutanlab</span>
        </nuxt-link>
      </div>
      <div class="col-6 collapse-close">
        <CloseButton @click="closeMenu" />
      </div>
    </div>
    <ul slot-scope="{closeMenu}" class="navbar-nav ml-lg-auto">
      <li
        v-for="(link, i) in links"
        :key="i"
        class="nav-item"
        @click="closeMenu"
      >
        <nuxt-link class="nav-link nav-link-icon" :to="link.to">
          <b>{{ link.text }}</b>
        </nuxt-link>
      </li>
    </ul>
  </BaseNav>
</template>

<script>
import BaseNav from '~/components/Argon/Nav'
import CloseButton from '~/components/Argon/CloseButton'

export default {
  components: {
    CloseButton,
    BaseNav
  },
  data: () => ({
    transparent: true,
    links: [
      { text: 'Home', to: '/' },
      { text: 'Blog', to: '/blog' }
    ]
  }),
  beforeMount() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      if (window.scrollY < 120) {
        this.transparent = true
      } else {
        this.transparent = false
      }
    }
  }
}
</script>

<style scoped>
* {
  transition: all ease-in-out .4s
}
li .nuxt-link-exact-active {
  background-color: rgba(255, 255, 255, 0.15);
}
</style>
