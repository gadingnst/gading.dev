export default {
  namespaced: true,
  state: () => ({
    onMountedShow: false,
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
    },
    toggleMountedShow(state, show = false) {
      state.onMountedShow = show
    }
  },
  getters: {
    isHomepage: state => state.homepage.show,
    isBlogContent: state => state.blogContent.show,
    onMountedShow: state => state.onMountedShow
  }
}
