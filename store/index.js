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
    menu: state => state.menu,
    mobile: () => ({
      Android: () => (
        window.navigator.userAgent.match(/Android/i)
      ),
      BlackBerry: () => (
        window.navigator.userAgent.match(/BlackBerry/i)
      ),
      iOS: () => (
        window.navigator.userAgent.match(/iPhone|iPad|iPod/i)
      ),
      Opera: () => (
        window.navigator.userAgent.match(/Opera Mini/i)
      ),
      Windows: () => (
        window.navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)
      ),
      anyMobile() {
        return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows())
      }
    })
  }
}
