<template>
  <Banner>
    <div class="text-center">
      <h1 class="text-white text-smooth text-shadow">
        <b>4🙁4</b>
      </h1>
      <h4 class="text-white text-smooth text-shadow">
        <b>Oops! The page you are looking can't be found.”</b>
      </h4>
      <Button tag="a" type="default" class="mt-3" href="/">
        Go Back Home
      </Button>
    </div>
  </Banner>
</template>

<script>
import Banner from '~/components/Base/Banner'
import Button from '~/components/Argon/Button'

export default {
  components: { Banner, Button }
}
</script>
