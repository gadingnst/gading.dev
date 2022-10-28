import { Fragment, FunctionComponent, useCallback, useMemo } from 'react';
import type { ContentMeta } from '@/server/content-parser';
import { Pagination } from '@/components/base';
import BlogCardList from '@/components/layouts/blog/CardList';
import { BLOG_PAGINATION_LIMIT } from '@/utils/config';
import Navbar from '@/components/layouts/main/Navbar';
import Banner from '@/components/layouts/main/Banner';
import Content from '@/components/base/Content';
import Footer from '@/components/layouts/main/Footer';
import createContentLocales from '@/utils/helpers/locales';

export type Props = {
  contents: ContentMeta[];
  locale: string;
  total: number;
  pageCurrent?: number;
};

export const withLocales = createContentLocales({
  desc: {
    en: 'Coding, work, life, and whatever i want.',
    id: 'Kode, pekerjaan, kehidupan, dan apapun yang ku mau.'
  }
});

const BlogPageList: FunctionComponent<Props> = (props) => {
  const {
    contents,
    locale,
    total,
    pageCurrent = 1
  } = props;

  const locales = useMemo(() => withLocales(locale), [locale]);

  const pageCount = useMemo(() => {
    return Math.ceil(total / BLOG_PAGINATION_LIMIT);
  }, [total]);

  const handleLocaleChange = useCallback(() => ({
    pathname: '/blog',
    asPath: '/blog'
  }), []);

  return (
    <Fragment>
      <Navbar
        localeChange
        onLocaleChange={handleLocaleChange}
      />
      <Banner
        bgImage="/media/banners/5.jpg"
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="container -mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white animate-[scale_.25s_ease-in-out]">
            Blog
          </h1>
          <p className="text-lg opacity-0 px-8 text-white dark:text-white animate-[y-b-25_.3s_ease-in-out_.2s_1_normal_forwards]">
            {locales.desc}”
          </p>
        </div>
      </Banner>
      <Content className="flex flex-col items-center justify-center">
        <BlogCardList
          className="-mt-80"
          contents={contents}
          locale={locale}
        />
        {pageCount > 1 && (
          <div className="mt-40 text-center">
            <h4 className="mb-16">
              Page {pageCurrent} of {pageCount}
            </h4>
            <Pagination
              hrefPrefix="/blog/page/"
              value={pageCurrent}
              pageCount={pageCount}
            />
          </div>
        )}
      </Content>
      <Footer />
    </Fragment>
  );
};

export default BlogPageList;
