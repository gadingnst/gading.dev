export default {
  state: () => ({
    menu: [
      { text: 'Home', to: '/' },
      { text: 'Blog', to: '/blog' }
    ]
  }),
  getters: {
    menu: state => state.menu
  }
}
