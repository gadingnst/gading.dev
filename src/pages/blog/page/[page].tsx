import type { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { withMainLayoutPage } from '@/components/layouts';
import { getBlogList, ContentBlogList } from '@/server/content-parser';
import { BLOG_PAGINATION_LIMIT, DEFAULT_LOCALE } from '@/utils/config';
import BlogPageList, { withLocales } from '@/components/layouts/blog/PageList';
import range from '@/utils/helpers/range';
import { I18n } from '@/types/contents';

type Props = {
  blogs: ContentBlogList;
  locale: string;
  page: number;
};

export const getStaticPaths = async(): Promise<GetStaticPathsResult> => {
  const paths = await Promise.all(Object.keys(I18n)
    .map(async(locale) => {
      const { total } = await getBlogList(locale);
      return range(1, Math.ceil(total / BLOG_PAGINATION_LIMIT))
        .map(page => ({ params: { page: `${page}` }, locale }));
    }));
  return {
    paths: paths.flat(1),
    fallback: false
  };
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const { locale = DEFAULT_LOCALE, params } = ctx;
  const {
    page: pageParams = '1'
  } = params as any;
  const page = parseInt(pageParams, 10);
  if (!Number.isNaN(page)) {
    const blogs = await getBlogList(locale, {
      limit: page * BLOG_PAGINATION_LIMIT,
      offset: (page - 1) * BLOG_PAGINATION_LIMIT
    });
    return {
      props: {
        blogs,
        locale,
        page
      }
    };
  }
  return {
    notFound: true
  };
};

const BlogPagingPage: NextPage<Props> = (props) => {
  const { blogs, locale, page } = props;
  const { total, contents } = blogs;
  return (
    <BlogPageList
      contents={contents}
      locale={locale}
      pageCurrent={page}
      total={total}
    />
  );
};

export default withMainLayoutPage(BlogPagingPage, ({ locale, page }) => {
  return {
    locale,
    meta: {
      title: `Blog - Page ${page}`,
      date: '2022-06-01',
      image: '/media/banners/5.jpg',
      keywords: 'gadings writing, technical writing, blog gading, gading blog',
      slug: `blog/page/${page}`,
      tags: ['blog', 'writing', 'technical writing', 'gadings'],
      description: withLocales(locale).desc
    }
  };
});
