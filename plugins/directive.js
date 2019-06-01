import clickOutside from '~/directives/click-outside.js'

export default {
  install(Vue) {
    Vue.directive('click-outside', clickOutside)
  }
}
