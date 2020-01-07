<template>
  <PageList
    :contents="contents"
    :total="total"
    :page="Number.parseInt(page)"
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
  asyncData: ({ params }) => {
    const limit = process.env.BLOG_PAGINATION_LIMIT
    return Promise.all(posts
      .filter((_, idx) => (
        idx in invert(range(
          (params.page - 1) * limit,
          (params.page * limit) - 1
        ))
      ))
      .map(post => (
        import(`~/contents/posts/published/${post.name}/index.md`)
          .then(content => ({
            ...content.attributes,
            readingtime: formatReadingTime(content.body)
          }))))
    ).then(contents => ({
      contents,
      page: params.page,
      total: posts.length
    }))
  }
}
</script>
