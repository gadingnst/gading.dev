import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import VueDisqus from 'vue-disqus'
import Directive from './directive'

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  lazyComponent: true
})

Vue.use(VueDisqus)
Vue.use(Directive)
