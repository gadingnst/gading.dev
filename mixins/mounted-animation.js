import { mapMutations } from 'vuex';

export default {
  mounted() {
    this.toggleMountedShow(true);
  },
  methods: {
    ...mapMutations({
      toggleMountedShow: 'router/toggleMountedShow'
    })
  }
};
