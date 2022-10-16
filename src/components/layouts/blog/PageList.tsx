import { Fragment, FunctionComponent, Suspense, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import type { ContentMeta } from '@/server/content-parser';
import BlogCardList from '@/components/layouts/blog/CardList';
import { BLOG_PAGINATION_LIMIT } from '@/utils/config';
import Navbar from '@/components/layouts/main/Navbar';
import Banner from '@/components/layouts/main/Banner';
import Content from '@/components/layouts/main/Content';
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

const Pagination = dynamic(() => import('@/components/base/Pagination'), {
  suspense: true
});

const BlogPageList: FunctionComponent<Props> = (props) => {
  const {
    contents,
    locale,
    total,
    pageCurrent = 1
  } = props;

  const router = useRouter();

  const locales = useMemo(() => withLocales(locale), [locale]);

  const pageCount = useMemo(() => {
    return Math.ceil(total / BLOG_PAGINATION_LIMIT);
  }, [total]);

  const handlePageChange = useCallback((page: number) => {
    router.push('/blog/page/[page]', `/blog/page/${page}`);
  }, []);

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
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-4xl mb-8 text-white dark:text-white"
          >
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 }}
            className="text-lg px-8 text-white dark:text-white"
          >
            {locales.desc}”
          </motion.p>
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
            <Suspense
              fallback={
                <div className="container max-w-5xl mt-40 mx-auto">
                  <h4 className="text-center mb-12">
                    Loading Pagination..
                  </h4>
                </div>
              }
            >
              <Pagination
                onPageChange={handlePageChange}
                value={pageCurrent}
                pageCount={pageCount}
              />
            </Suspense>
          </div>
        )}
      </Content>
      <Footer />
    </Fragment>
  );
};

export default BlogPageList;
