<template>
  <PageList
    :contents="contents"
    :total="total"
  />
</template>

<script>
import { formatReadingTime } from '~/utils/helpers'
import PageList from '~/components/Blog/PageList'
import Contents from '~/contents'

export default {
  components: {
    PageList
  },
  asyncData: () => (
    Promise.all(Contents.map(async content => {
      content = await import(`~/contents/posts/${content.name}/index.md`)
      console.log(content)
      return {
        ...content.attributes,
        readingtime: formatReadingTime(content.body)
      }
    })).then(res => ({
      contents: res.reverse().slice(0, process.env.BLOG_PAGINATION_LIMIT),
      total: res.length
    }))
  )
}
</script>
