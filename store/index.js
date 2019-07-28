export default {
  state: () => ({
    menu: [
      { text: 'Home', to: '/' },
      { text: 'Now', to: '/now' },
      { text: 'Portfolio', to: '/portfolio' },
      { text: 'Blog', to: '/blog' }
    ]
  }),
  getters: {
    menu: state => state.menu
  }
}
