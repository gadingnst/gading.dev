<template>
  <div id="banner" :style="`height: ${height}`">
    <figure :style="`background-color: rgba(0, 0, 0, ${overlay})`">
      <div class="d-flex align-items-center justify-content-center px-3 mx-auto">
        <slot />
      </div>
    </figure>
    <no-ssr>
      <Parallax :style="`min-height: ${height}`" :speed-factor="speed" breakpoint="(min-width: 0px)">
        <img :src="image" :alt="alt">
      </Parallax>
    </no-ssr>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy'

export default {
  components: {
    Parallax
  },
  props: {
    speed: {
      type: Number,
      default: 0.25
    },
    height: {
      type: String,
      description: 'Min: 450px',
      default: '100vh'
    },
    overlay: {
      type: Number,
      default: 0.35
    },
    image: {
      type: String,
      default: '/assets/img/collections/desks/desk1.jpg'
    },
    alt: {
      type: String,
      default: 'Sutanlab Banner'
    }
  }
}
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
