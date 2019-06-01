<template>
  <v-layout row wrap class="comments default lighten-2 white--text pb-3 pt-1">
    <v-container class="text-xs-center">
      <h2 class="text--white mb-3">
        {{ !disqusLoaded ? 'Loading Comments..' : 'Comments' }}
      </h2>
      <v-divider />
      <v-progress-circular
        v-if="!disqusLoaded"
        class="mt-5"
        :size="75"
        color="white"
        indeterminate
      />
      <v-flex class="mx-auto mt-4 md8 xs12">
        <no-ssr>
          <lazy-component>
            <vue-disqus
              v-show="disqusLoaded"
              :shortname="shortname"
              :title="title"
              :url="url"
              :identifier="`${shortname}-${identifier}`"
              @ready="disqusLoaded = true"
            />
          </lazy-component>
        </no-ssr>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
export default {
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
