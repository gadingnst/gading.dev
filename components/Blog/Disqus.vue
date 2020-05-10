<template>
  <div class="row comments pb-3 justify-content-center">
    <div class="col-lg-10 order-lg-2 text-center">
      <h4 class="mb-1 pt-3">
        <b>{{ !ready ? 'Loading Comments..' : 'Comments' }}</b>
      </h4>
      <div class="mx-auto mt-3">
        <client-only>
          <lazy-component>
            <FadeTransition :duration="1250">
              <vue-disqus
                :shortname="shortname"
                :title="title"
                :url="url"
                :identifier="`${shortname}-${identifier}`"
                :ready="ready = true"
              />
            </FadeTransition>
          </lazy-component>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
import { FadeTransition } from 'vue2-transitions'

export default {
  components: { FadeTransition },
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
    ready: false
  })
}
</script>
