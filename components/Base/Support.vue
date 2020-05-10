<template>
  <div class="my-3">
    <Button
      tag="a"
      target="_blank"
      href="https://trakteer.id/sutanlab"
      size="lg"
      class="d-inline-flex my-1"
      bg-color="#BE1E2D"
    >
      <client-only>
        <md-ice-cream-icon w="20px" h="20px" />
      </client-only>
      &nbsp;Trakteer
    </Button>
    <Button
      tag="a"
      target="_blank"
      href="https://karyakarsa.com/sutanlab"
      type="danger"
      size="lg"
      class="d-inline-flex my-1"
      bg-color="#EB5757"
    >
      <client-only>
        <md-heart-icon w="20px" h="20px" />
      </client-only>
      &nbsp;KaryaKarsa
    </Button>
  </div>
</template>

<script>
import MdHeartIcon from 'vue-ionicons/dist/md-heart.vue'
import MdIceCreamIcon from 'vue-ionicons/dist/md-ice-cream.vue'
import Button from '~/components/Argon/Button'

export default {
  components: {
    Button, MdHeartIcon, MdIceCreamIcon
  }
}
</script>
