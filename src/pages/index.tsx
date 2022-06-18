import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment } from 'react';
import { CardHero, Button } from '@/components/base';
import { Banner, Navbar, Footer, Content, ContentParser, withMainLayoutPage } from '@/components/layouts';
import BlogCardList from '@/components/layouts/blog/CardList';
import { DEFAULT_LOCALE } from '@/utils/config';
import { motion } from 'framer-motion';
import { ContentMeta, getBlogList, getContentMultiLanguage, MDContent } from '@/server/content-parser';
import generateRSSFeed from '@/server/feed-rss';

type Props = {
  contents: MDContent;
  blogs: ContentMeta[];
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE
  } = ctx;
  const [contents, { contents: blogs }] = await Promise.all([
    getContentMultiLanguage('home', locale),
    getBlogList(locale, { limit: 4 }),
    generateRSSFeed()
  ]);
  return {
    props: {
      contents,
      blogs,
      locale
    }
  };
};

const HomePage: NextPage<Props> = (props) => {
  const { contents, blogs, locale } = props;
  const { meta, content } = contents;
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner bgImage="/media/banners/1.jpg" className="font-courgette text-white util--text-shadow text-center">
        <div className="container -mt-48">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-4xl mb-8 text-white dark:text-white"
          >
            {meta.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 }}
            className="text-lg px-8 text-white dark:text-white"
          >
            {meta.description}”
          </motion.p>
        </div>
      </Banner>
      <Content>
        <CardHero className="min-h-[0px]">
          <ContentParser className="text-center">
            {content}
          </ContentParser>
        </CardHero>
        <motion.div
          className="flex justify-center items-center flex-col my-40"
          initial={{ opacity: 0, y: 150 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.5 }}
        >
          <h3 className="font-courgette">
            Latest Posts
          </h3>
          <hr className="w-full mt-16" />
          <BlogCardList contents={blogs} locale={locale} />
          <Button href="/blog" className="text-white dark:text-white mt-36 bg-primary hover:no-underline">
            More Posts...
          </Button>
        </motion.div>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withMainLayoutPage(HomePage, (props) => {
  const { contents, locale } = props;
  const { meta } = contents;
  return {
    locale,
    meta: {
      ...meta,
      title: 'Sutan Gading Fadhillah Nasution',
      slug: ''
    }
  };
});
