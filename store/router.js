export default {
  namespaced: true,
  state: () => ({
    homepage: {
      show: false,
      routes: [
        'index'
      ]
    },
    blogContent: {
      show: false,
      routes: [
        'blog-slug'
      ]
    }
  }),
  mutations: {
    watchRoutes(state, routeName) {
      state.homepage.show = (state.homepage.routes.includes(routeName))
      state.blogContent.show = (state.blogContent.routes.includes(routeName))
    }
  },
  getters: {
    isHomepage: state => state.homepage.show,
    isBlogContent: state => state.blogContent.show
  }
}
