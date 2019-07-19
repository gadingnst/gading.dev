<template>
  <div
    v-show="active"
    :id="id || label"
    class="tab-pane fade"
    :class="{ 'active show': active }"
    :aria-expanded="active"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: ['label', 'id', 'title'],
  inject: ['addTab', 'removeTab'],
  data() {
    return {
      active: false
    }
  },
  mounted() {
    this.addTab(this)
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.removeTab(this)
  }
}
</script>
<style>
</style>
