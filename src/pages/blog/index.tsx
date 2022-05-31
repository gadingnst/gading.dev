import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { withLayoutPage } from '@/components';
import { getBlogList, ContentBlogList } from '@/server/content-parser';
import { DEFAULT_LOCALE } from '@/utils/config';
import BlogList from '@/components/Pages/BlogList';

type Props = {
  blogs: ContentBlogList;
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const { locale = DEFAULT_LOCALE } = ctx;
  const blogs = await getBlogList(locale);
  return {
    props: {
      blogs,
      locale
    }
  };
};

const BlogIndexPage: NextPage<Props> = (props) => {
  const { blogs, locale } = props;
  const { total, contents } = blogs;
  return (
    <BlogList
      contents={contents}
      locale={locale}
      pageCurrent={1}
      total={total}
    />
  );
};

export default withLayoutPage(BlogIndexPage, {
  title: 'Blog'
});
