import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
import {
  Content,
  Footer,
  Navbar,
  Banner,
  Card,
  withLayoutPage,
  Link,
  ImageLazy,
  ContentInfo
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
    revalidate: 60 * 60,
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
            Coding, work, life, and whatever i want.”
          </motion.p>
        </div>
      </Banner>
      <Content className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-28 w-full max-w-5xl sm:grid-cols-2 -mt-80">
          {contents.map(item => (
            <Card
              hoverEffect
              key={item.slugOriginal}
              className="rounded-12 overflow-hidden"
            >
              <div className="relative w-full overflow-hidden h-[200px]">
                <ImageLazy
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full"
                  wrapperClassName="w-full"
                  width="100%"
                  height={200}
                  placeholderScaling={0.075}
                />
              </div>
              <div className="flex flex-col pt-12 pb-16 px-16">
                <div className="flex flex-col justify-between items-center min-h-[50px]">
                  <div className="w-full text-center">
                    <Link
                      href="/blog/[slug]"
                      asPath={`/blog/${item.slugOriginal}`}
                      className="mb-4 text-primary dark:text-primary-2"
                      locale={locale}
                    >
                      {item.title}
                    </Link>
                  </div>
                  <ContentInfo
                    className="flex my-8 text-xs"
                    meta={item}
                    locale={locale}
                  />
                </div>
                <hr className="w-full mt-0 mb-12" />
                <p className="text-center text-sm">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(BlogListPage, {
  title: 'Blog'
});
