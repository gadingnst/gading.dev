import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  Content,
  Footer,
  Navbar,
  Banner,
  withLayoutPage,
  CardBlogList
} from '@/components';
import { getBlogList, ContentMeta } from '@/server/content-parser';
import { DEFAULT_LOCALE } from '@/utils/config';

type Props = {
  contents: ContentMeta[];
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const { locale = DEFAULT_LOCALE } = ctx;
  const contents = await getBlogList(locale);
  return {
    props: {
      contents,
      locale
    }
  };
};

const BlogListPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  return (
    <Fragment>
      <Navbar localeChange />
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
      <Content className="flex items-center justify-center">
        <CardBlogList
          className="-mt-80"
          contents={contents}
          locale={locale}
        />
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(BlogListPage, {
  title: 'Blog'
});
