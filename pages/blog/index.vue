<template>
  <PageList
    :contents="contents"
    :total="total"
  />
</template>

<script>
import { formatReadingTime, range, invert } from '~/utils/helpers'
import PageList from '~/components/Blog/PageList'
import posts from '~/contents/posts/published'

export default {
  components: {
    PageList
  },
  asyncData: () => (
    Promise.all(posts
      .filter((_, idx) => (
        idx in invert(range(0, process.env.BLOG_PAGINATION_LIMIT - 1))
      ))
      .map(post => (
        import(`~/contents/posts/published/${post.name}/index.md`)
          .then(content => ({
            ...content.attributes,
            readingtime: formatReadingTime(content.body)
          }))
      ))
    ).then(contents => ({
      contents,
      total: posts.length
    }))
  )
}
</script>
