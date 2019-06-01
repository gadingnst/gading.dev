<template>
  <div
    class="custom-control custom-checkbox"
    :class="[{disabled: disabled}, inlineClass]"
  >
    <input
      :id="cbId"
      v-model="model"
      class="custom-control-input"
      type="checkbox"
      :disabled="disabled"
    >
    <label :for="cbId" class="custom-control-label">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>

<script>
import { randomString } from '~/utils/string'

export default {
  model: {
    prop: 'checked'
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: 'Whether checkbox is checked',
      default: () => [[], false]
    },
    disabled: {
      type: Boolean,
      description: 'Whether checkbox is disabled',
      default: false
    },
    inline: {
      type: Boolean,
      description: 'Whether checkbox is inline',
      default: false
    }
  },
  data() {
    return {
      cbId: '',
      touched: false
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(check) {
        if (!this.touched) {
          this.touched = true
        }
        this.$emit('input', check)
      }
    },
    inlineClass() {
      return this.inline ? 'form-check-inline' : null
    }
  },
  mounted() {
    this.cbId = randomString()
  }
}
</script>
