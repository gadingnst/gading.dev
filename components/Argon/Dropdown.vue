<template>
  <component
    :is="tag"
    v-click-outside="closeDropDown"
    class="dropdown"
    :class="[{show: isOpen}, {'dropdown': direction === 'down'}, {'dropup': direction ==='up'}]"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="toggleDropDown"
  >
    <slot name="title">
      <a
        class="dropdown-toggle nav-link"
        :class="{'no-caret': hideArrow}"
        data-toggle="dropdown"
      >
        <i :class="icon" />
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[{'dropdown-menu-right': position === 'right'}, {show: isOpen}, menuClasses]"
    >
      <slot />
    </ul>
  </component>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default: 'down'
    },
    title: {
      type: String,
      default: '',
      description: 'Dropdown title'
    },
    icon: {
      type: String,
      default: '',
      description: 'Icon for dropdown title'
    },
    position: {
      type: String,
      default: '',
      description: 'Position of dropdown menu (e.g right|left)'
    },
    menuClasses: {
      type: [String, Object],
      default: '',
      description: 'Dropdown menu classes'
    },
    hideArrow: {
      type: Boolean,
      description: 'Whether dropdown arrow should be hidden'
    },
    tag: {
      type: String,
      default: 'li',
      description: 'Dropdown html tag (e.g div, li etc)'
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
      this.$emit('change', this.isOpen);
    },
    closeDropDown() {
      this.isOpen = false;
      this.$emit('change', this.isOpen);
    }
  }
};
</script>

<style>
.dropdown {
  list-style-type: none
}

.dropdown .dropdown-toggle {
  cursor: pointer
}
</style>
