<template>
  <div id="banner" :style="`height: ${height}; background-color: #5E72E4`">
    <figure :style="`background-color: rgba(0, 0, 0, ${overlay})`">
      <div style="width: 100%" class="d-flex align-items-center justify-content-center px-3 mx-auto">
        <slot />
      </div>
    </figure>
    <client-only v-if="!noParallax">
      <Parallax
        :style="`min-height: ${height}`"
        :speed-factor="speed"
        breakpoint="(min-width: 0px)"
      >
        <img v-lazy="image" :alt="alt">
      </Parallax>
    </client-only>
    <img
      v-else
      :src="image"
      :style="`height: ${height}; object-fit: cover`"
      :alt="alt"
    >
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';

export default {
  components: {
    Parallax
  },
  props: {
    noParallax: {
      type: Boolean,
      default: false
    },
    speed: {
      type: Number,
      default: 0.25
    },
    height: {
      type: String,
      description: 'Min: 70vh. Max: 100vh',
      default: '100vh'
    },
    overlay: {
      type: Number,
      default: 0.35
    },
    image: {
      type: String,
      default: '/assets/img/collections/default-banners/1.jpg'
    },
    alt: {
      type: String,
      default: 'Sutanlab Banner'
    }
  }
};
</script>

<style lang="scss" scoped>
  #banner {
    position: relative;
    z-index: 0;
    width: 100%;
    top: 0;
    img {
      width: 100%;
    }
    figure {
      position: absolute;
      display: flex;
      height: 100%;
      width: 100%;
      color: #fff;
    }
  }
</style>
