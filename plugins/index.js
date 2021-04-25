import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
import VueDisqus from 'vue-disqus'
import { DISQUS_SHORTNAME } from '../utils/config'
import Directive from './directive'

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  lazyComponent: true
})

Vue.use(VueDisqus, {
  shortname: DISQUS_SHORTNAME
})

Vue.use(Directive)
