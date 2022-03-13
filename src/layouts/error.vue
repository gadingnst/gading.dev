<template>
  <Banner no-parallax>
    <div class="text-center">
      <h1 class="text-white text-smooth text-shadow">
        <b>{{ is404 ? '404' : error.statusCode }}</b>
      </h1>
      <h4 class="text-white text-smooth text-shadow">
        <b>Oops! {{ is404 ? 'This page could not be found' : 'Something went wrong' }}.” 🙁</b>
      </h4>
      <Button v-if="is404" tag="a" type="default" class="mt-3" href="/">
        Go Back Home
      </Button>
    </div>
  </Banner>
</template>

<script>
import Banner from '~/components/Base/Banner';
import Button from '~/components/Argon/Button';
import { AUTHOR_NAME } from '~/utils/config';

export default {
  components: { Banner, Button },
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  head: () => ({
    title: `Error page | ${AUTHOR_NAME}`
  }),
  computed: {
    is404() {
      return this.error.statusCode === 404 || this.error.message.includes('Cannot find module');
    }
  }
};
</script>
