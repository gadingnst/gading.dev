<template>
  <label class="custom-toggle">
    <input
      v-model="model"
      type="checkbox"
      v-bind="$attrs"
      v-on="$listeners"
    >
    <span class="custom-toggle-slider rounded-circle" />
  </label>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: Boolean,
      default: false,
      description: 'Switch value'
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
<style>
</style>
