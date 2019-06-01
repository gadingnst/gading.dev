export default {
  state: () => ({
    menu: [
      { title: 'Home', icon: 'home', to: '/' },
      { title: 'Blog', icon: 'chrome_reader_mode', to: '/blog' }
    ],
    scroll: {
      options: {
        duration: 750,
        offset: 40,
        easing: 'easeInOutQuart'
      }
    },
    sidebar: {
      visible: null
    }
  }),
  mutations: {
    setSidebar(state, value) {
      state.sidebar.visible = value
    },
    setScrollOptions(state, opt) {
      state.scroll.options.duration = opt.duration || state.scroll.options.duration
      state.scroll.options.offset = opt.offset || state.scroll.options.offset
      state.scroll.options.easing = opt.easing || state.scroll.options.easing
    }
  }
}
