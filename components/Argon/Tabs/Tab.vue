<template>
  <div
    v-show="active"
    :id="id || title"
    :class="`tab-pane ${active ? active : ''}`"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      description: 'Tab pane title'
    },
    id: {
      type: String,
      default: null,
      description: 'Tab pane id'
    }
  },
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
