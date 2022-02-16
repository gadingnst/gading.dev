<template>
  <div class="my-3">
    <Button
      v-for="(support, idx) in supports"
      :key="idx"
      :href="support.link"
      tag="a"
      target="_blank"
      size="lg"
      class="d-inline-flex my-1"
      rel="noreferrer"
      :bg-color="support.color"
    >
      <client-only>
        <component :is="support.icon" w="20px" h="20px" />
      </client-only>
      &nbsp;{{ support.name }}
    </Button>
  </div>
</template>

<script>
import MdHeartIcon from 'vue-ionicons/dist/md-heart.vue';
import MdCafeIcon from 'vue-ionicons/dist/md-cafe.vue';
import MdIceCreamIcon from 'vue-ionicons/dist/md-ice-cream.vue';
import Button from '~/components/Argon/Button';

export default {
  components: {
    Button, MdCafeIcon, MdHeartIcon, MdIceCreamIcon
  },
  data: () => ({
    supports: [
      { name: 'Ko-fi', link: 'https://ko-fi.com/sutanlab', color: '#ff5f5f', icon: 'md-cafe-icon' },
      { name: 'Trakteer', link: 'https://trakteer.id/sutanlab', color: '#BE1E2D', icon: 'md-ice-cream-icon' },
      { name: 'Karyakarsa', link: 'https://karyakarsa.com/sutanlab', color: '#eb5757', icon: 'md-heart-icon' }
    ]
  })
};
</script>
