import { Fragment, FunctionComponent, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Pagination } from '@/components/base';
import BlogCardList from '@/components/layouts/blog/CardList';
import { ContentMeta } from '@/server/content-parser';
import { BLOG_PAGINATION_LIMIT } from '@/utils/config';
import { useRouter } from 'next/router';
import Navbar from '@/components/layouts/main/Navbar';
import Banner from '@/components/layouts/main/Banner';
import Content from '@/components/layouts/main/Content';
import Footer from '@/components/layouts/main/Footer';

export type Props = {
  contents: ContentMeta[];
  locale: string;
  total: number;
  pageCurrent?: number;
};

const BlogPageList: FunctionComponent<Props> = (props) => {
  const {
    contents,
    locale,
    total,
    pageCurrent = 1
  } = props;

  const router = useRouter();

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
            {
              locale === 'en'
                ? 'Coding, work, life, and whatever i want.'
                : 'Kode, pekerjaan, kehidupan, dan apapun yang ku mau.'
            }”
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
            <Pagination
              onPageChange={handlePageChange}
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
