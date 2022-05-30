import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment } from 'react';
import { Content, Footer, Navbar, Banner, CardHero, withLayoutPage, ContentParser, CardBlog, Button } from '@/components';
import { DEFAULT_LOCALE } from '@/utils/config';
import { motion } from 'framer-motion';
import { ContentMeta, getBlogList, getContentMultiLanguage, MDContent } from '@/server/content-parser';

type Props = {
  contents: MDContent;
  blogList: ContentMeta[];
  locale: string;
};

type LatestPostsProps = {
  blogList: ContentMeta[];
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE
  } = ctx;
  const [contents, blogList] = await Promise.all([
    getContentMultiLanguage('home', locale),
    getBlogList(locale, 4)
  ]);
  return {
    revalidate: 60 * 60,
    props: {
      contents,
      blogList,
      locale
    }
  };
};

const LatestPosts = ({ blogList, locale }: LatestPostsProps) => (
  <div className="grid grid-cols-1 gap-28 w-full max-w-5xl sm:grid-cols-2">
    {blogList.map((item) => <CardBlog key={item.slugOriginal} meta={item} locale={locale} />)}
  </div>
);

const HomePage: NextPage<Props> = (props) => {
  const { contents, blogList, locale } = props;
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
          <LatestPosts blogList={blogList} locale={locale} />
          <Button href="/blog" className="text-white dark:text-white mt-36 bg-primary hover:no-underline">
            More Posts...
          </Button>
        </motion.div>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(HomePage, {
  title: 'Gading\'s Hideout'
});
