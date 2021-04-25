<template>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    aria-label="Toggle navigation"
    :data-target="target"
    :aria-controls="target"
    :aria-expanded="toggled"
  >
    <span class="navbar-toggler-icon" />
  </button>
</template>

<script>
export default {
  props: {
    target: {
      type: [String, Number],
      default: '',
      description: 'Button target element'
    },
    toggled: {
      type: Boolean,
      default: false,
      description: 'Whether button is toggled'
    }
  }
}
</script>
<style>
</style>
