<template>
  <component :is="tag" v-lazy-container="{ selector, loading, error }">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    selector: {
      type: String,
      default: 'img'
    },
    loading: {
      type: String,
      default: '/assets/img/placeholders/loading.svg'
    },
    error: {
      type: String,
      default: '/assets/img/placeholders/error.png'
    }
  }
};
</script>
