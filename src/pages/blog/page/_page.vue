<template>
  <PageList
    :contents="contents"
    :total="total"
    :page="Number.parseInt(page)"
  />
</template>

<script>
import { formatReadingTime, range, invert } from '~/utils/helpers';
import PageList from '~/components/Blog/PageList';
import posts from '~/contents/posts/published';
import { BLOG_PAGINATION_LIMIT } from '~/utils/config';

export default {
  components: {
    PageList
  },
  asyncData: async ({ params, error }) => {
    const limit = BLOG_PAGINATION_LIMIT;
    const page = Number.isNaN(Number(params.page)) ? 0 : params.page;
    if (page < 1) {
      return error({ statusCode: 404 });
    }
    const results = await Promise.all(posts
      .filter((_, idx) => (
        idx in invert(range(
          (page - 1) * limit,
          (page * limit) - 1
        ))
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
      page: params.page,
      total: posts.length
    }));
    if (results.contents.length < 1) {
      return error({ statusCode: 404 });
    }
    return results;
  }
};
</script>
