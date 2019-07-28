<template>
  <PageList
    :contents="contents"
    :total="total"
    :page="Number.parseInt(page)"
  />
</template>

<script>
import { formatReadingTime } from '~/utils/helpers'
import PageList from '~/components/Blog/PageList'
import posts from '~/contents/posts'

export default {
  components: {
    PageList
  },
  asyncData: ({ params }) => (
    Promise.all(posts.map(async content => {
      content = await import(`~/contents/posts/${content.name}/index.md`)
      return {
        ...content.attributes,
        readingtime: formatReadingTime(content.body)
      }
    })).then(res => ({
      page: params.page,
      contents: res.reverse().slice(
        (params.page - 1) * process.env.BLOG_PAGINATION_LIMIT,
        params.page * process.env.BLOG_PAGINATION_LIMIT
      ),
      total: res.length
    }))
  )
}
</script>
