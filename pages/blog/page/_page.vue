<template>
  <PageList :contents="contents" :total="total" :page="Number.parseInt(page)" />
</template>

<script>
import { formatReadingTime } from '~/utils/helpers'
import PageList from '~/components/Blog/PageList'
import Contents from '~/contents'

export default {
  components: {
    PageList
  },
  asyncData: ({ params }) => (
    Promise.all(Contents.map(async content => {
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
