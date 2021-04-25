<template>
  <div class="row comments pb-3 justify-content-center">
    <div class="col-lg-10 order-lg-2 text-center">
      <h4 class="mb-1 pt-3">
        <b>Comments</b>
      </h4>
      <div class="mx-auto mt-3">
        <client-only>
          <lazy-component>
            <Disqus :page-config="pageConfig" />
          </lazy-component>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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
      required: true
    }
  },
  computed: {
    pageConfig() {
      return {
        title: this.title,
        url: this.url,
        identifier: `sutanlab/blog/${this.identifier}`
      }
    }
  }
}
</script>
