export default {
  state: () => ({
    menu: [
      { text: 'Home', to: '/' },
      { text: 'Now', to: '/now' },
      { text: 'Blog', to: '/blog' }
    ]
  }),
  getters: {
    menu: state => state.menu
  }
}
