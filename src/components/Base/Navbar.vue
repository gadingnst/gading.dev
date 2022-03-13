<template>
  <BaseNav
    id="navbar"
    :style="transparent ? `background-color: transparent !important;` : 'box-shadow: 0 2px 6px rgba(0, 0, 0, .12) !important'"
    class="fixed-top"
    expand
  >
    <nuxt-link
      slot="brand"
      :class="`site-title display-4 text-white mr-lg-5 text-smooth ${transparent ? 'text-shadow' : ''}`"
      to="/"
    >
      {{ siteName }}
    </nuxt-link>
    <div slot="content-header" slot-scope="{ closeMenu }" class="row">
      <div class="col-6 collapse-brand">
        <nuxt-link to="/" class="site-title text-smooth">
          <span>{{ siteName }}</span>
        </nuxt-link>
      </div>
      <div class="col-6 collapse-close">
        <CloseButton @click="closeMenu" />
      </div>
    </div>
    <span slot="container-mid">
      <SwitchMode />
    </span>
    <ul slot-scope="{ closeMenu }" class="navbar-nav ml-lg-auto">
      <li
        v-for="(link, i) in $store.getters.menu"
        :key="i"
        class="nav-item"
        @click="closeMenu"
      >
        <nuxt-link class="px-2 nav-link nav-link-icon" :to="link.to">
          <b>{{ link.text }}</b>
        </nuxt-link>
      </li>
    </ul>
  </BaseNav>
</template>

<script>
import BaseNav from '~/components/Argon/Nav';
import CloseButton from '~/components/Argon/CloseButton';
import SwitchMode from '~/components/Base/SwitchMode';
import { SITE_NAME } from '~/utils/config';

export default {
  components: {
    CloseButton,
    BaseNav,
    SwitchMode
  },
  data: () => ({
    transparent: true,
    siteName: SITE_NAME
  }),
  beforeMount() {
    window.addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  methods: {
    onScroll() {
      if (window.scrollY < 80) {
        this.transparent = true;
      } else {
        this.transparent = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  transition: all ease-in-out .4s
}

li .nuxt-link-exact-active {
  background-color: rgba(255, 255, 255, 0.15);
}

.navbar-collapse.show {
  li .nuxt-link-exact-active {
    background-color: rgba(0, 0, 0, 0.15);
  }
}

body.mode-dark {
  #navbar {
    background-color: #282F5F !important;
  }
  .navbar-collapse.show {
    li .nuxt-link-exact-active {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
}

</style>
