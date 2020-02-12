export default {
  state: () => ({
    posts: [],
    searching: false,
    darkMode: false
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setSearching(state, status) {
      state.searching = status
    },
    toggleDark(state, mode = !state.darkMode) {
      state.darkMode = mode
    }
  },
  actions: {
    getPosts({ commit }) {
      commit('setSearching', true)
      window.fetch('/posts.published.json')
        .then(res => res.json())
        .then(result => {
          commit('setSearching', false)
          commit('setPosts', result)
        })
    }
  },
  getters: {
    posts: state => state.posts,
    searching: state => state.searching,
    darkMode: state => state.darkMode,
    menu: () => [
      { text: 'Home', to: '/' },
      { text: 'Now', to: '/now' },
      { text: 'Portfolio', to: '/portfolio' },
      { text: 'Blog', to: '/blog' }
    ],
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
