export default {
  state: () => ({
    menu: [
      { title: 'Home', icon: 'home', to: '/' },
      { title: 'Blog', icon: 'chrome_reader_mode', to: '/blog' }
    ]
  }),
  getters: {
    menu: state => state.menu
  }
}
