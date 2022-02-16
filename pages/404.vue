<template>
  <Banner no-parallax>
    <div class="text-center">
      <h1 class="text-white text-smooth text-shadow">
        <b>404</b>
      </h1>
      <h4 class="text-white text-smooth text-shadow">
        <b>Oops! This page could not be found.” 🙁</b>
      </h4>
      <Button tag="a" type="default" class="mt-3" href="/">
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
  head: () => ({
    title: `Error page | ${AUTHOR_NAME}`
  })
};
</script>
