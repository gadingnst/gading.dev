<template>
  <div class="row comments pb-3 justify-content-center">
    <div class="col-lg-10 order-lg-2 text-center">
      <h4 class="mb-1 pt-3">
        <b>{{ !disqusLoaded ? 'Loading Comments..' : 'Comments' }}</b>
      </h4>
      <RingLoader
        :loading="!disqusLoaded"
        class="mt-5"
        color="#5E72E4"
        size="100px"
      />
      <div class="mx-auto mt-3">
        <no-ssr>
          <lazy-component>
            <FadeTransition :duration="1250">
              <vue-disqus
                v-show="disqusLoaded"
                :shortname="shortname"
                :title="title"
                :url="url"
                :identifier="`${shortname}-${identifier}`"
                @ready="disqusLoaded = true"
              />
            </FadeTransition>
          </lazy-component>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'
import RingLoader from 'vue-spinner/src/RingLoader.vue'

export default {
  components: {
    FadeTransition, RingLoader
  },
  props: {
    shortname: {
      type: String,
      default: 'sutanlab'
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    identifier: {
      type: String,
      default: `sutanlab-blog-${new Date().getTime()}`
    }
  },
  data: () => ({
    disqusLoaded: false
  })
}
</script>

<style>
.v-ring {
  margin: auto;
}
</style>
