<template>
  <component
    :is="tag"
    :type="tag === 'button' ? nativeType: ''"
    class="btn"
    :class="classes"
    :style="[...styles, bgColor ? { 'background-color': bgColor } : {}]"
    @click="handleClick"
  >
    <span v-if="$slots.icon || icon && $slots.default" class="btn-inner--icon">
      <slot name="icon">
        <i :class="icon" />
      </slot>
    </span>
    <i v-if="!$slots.default" :class="icon" />
    <span v-if="$slots.icon || icon && $slots.default" class="btn-inner--text">
      <slot>
        {{ text }}
      </slot>
    </span>
    <slot v-if="!$slots.icon && !icon" />
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: 'button',
      description: 'Button tag (default -> button)'
    },
    type: {
      type: String,
      default: 'default',
      description: 'Button type (e,g primary, danger etc)'
    },
    size: {
      type: String,
      default: '',
      description: 'Button size lg|sm'
    },
    textColor: {
      type: String,
      default: '',
      description: 'Button text color (e.g primary, danger etc)'
    },
    bgColor: {
      type: String,
      default: '',
      description: 'Button background color (e.g #AAA, #CDCDCD etc)'
    },
    nativeType: {
      type: String,
      default: 'button',
      description: 'Button native type (e.g submit,button etc)'
    },
    icon: {
      type: String,
      default: '',
      description: 'Button icon'
    },
    text: {
      type: String,
      default: '',
      description: 'Button text in case not provided via default slot'
    },
    outline: {
      type: Boolean,
      default: false,
      description: 'Whether button style is outline'
    },
    rounded: {
      type: Boolean,
      default: false,
      description: 'Whether button style is rounded'
    },
    iconOnly: {
      type: Boolean,
      default: false,
      description: 'Whether button contains only an icon'
    },
    block: {
      type: Boolean,
      default: false,
      description: 'Whether button is of block type'
    },
    styles: {
      type: Array,
      default: () => [],
      description: 'Inline styles css'
    }
  },
  computed: {
    classes() {
      const btnClasses = [
        { 'btn-block': this.block },
        { 'rounded-circle': this.rounded },
        { 'btn-icon-only': this.iconOnly },
        { [`text-${this.textColor}`]: this.textColor },
        { 'btn-icon': this.icon || this.$slots.icon },
        this.type && !this.outline ? `btn-${this.type}` : '',
        this.outline ? `btn-outline-${this.type}` : ''
      ]
      if (this.size) {
        btnClasses.push(`btn-${this.size}`)
      }
      return btnClasses
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
