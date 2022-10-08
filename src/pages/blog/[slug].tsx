import type { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { I18nLocales } from '@/types/contents';
import { Fragment, Suspense, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getAllBlogPaths, MDContent, getContent } from '@/server/content-parser';
import { CardHero } from '@/components/base';
import { Banner, Content, ContentParser, ContentInfo, Footer, Navbar, withMainLayoutPage } from '@/components/layouts';
import { DEFAULT_LOCALE } from '@/utils/config';

type Props = {
  contents: MDContent;
  locale: string;
};

export const getStaticPaths = async(): Promise<GetStaticPathsResult> => {
  const paths = await getAllBlogPaths();
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE,
    params
  } = ctx;
  const { slug } = params as any;
  const contents = await getContent(slug, locale);
  if (contents) {
    return {
      props: {
        contents,
        locale
      }
    };
  }
  return {
    notFound: true
  };
};

const Share = dynamic(() => import('@/components/layouts/blog/Share'), {
  suspense: true
});

const Disqus = dynamic(() => import('@/components/layouts/main/Content/Disqus'), {
  suspense: true
});

const BlogDetailPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  const { meta, content } = contents;

  const postPath = `${locale}/blog/${meta.slugOriginal}`;

  const localeChange = useMemo(() => {
    return Object.values(meta.slug).every(Boolean);
  }, [meta.slug]);

  const onLocaleChange = useCallback((i18nLocale: I18nLocales) => ({
    asPath: meta.slug[i18nLocale]
  }), []);

  return (
    <Fragment>
      <Navbar
        localeChange={localeChange}
        onLocaleChange={onLocaleChange}
      />
      <Banner
        bgImage={meta.image}
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="container -mt-48 px-8 md:px-0">
          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-xl sm:text-2xl md:text-3xl mb-8 text-white dark:text-white underline underline-offset-4"
          >
            {meta.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="text-base sm:text-lg px-8 text-white dark:text-white"
          >
            {meta.description}”
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.75, delay: 0.2 }}
          >
            <ContentInfo
              meta={meta}
              locale={locale}
              className="font-poppins text-xs mt-12 opacity-95"
              colorClassName="text-light-50 dark:text-light-50"
            />
          </motion.div>
        </div>
      </Banner>
      <Content>
        <CardHero>
          <ContentParser>
            {content}
          </ContentParser>
        </CardHero>
        <Suspense
          fallback={
            <div className="mt-40">
              <h4 className="text-center mb-12">
                Loading...
              </h4>
            </div>
          }
        >
          <Share
            path={postPath}
            meta={meta}
            locale={locale}
          />
        </Suspense>
        <Suspense
          fallback={
            <div className="container max-w-5xl mt-40 mx-auto">
              <h4 className="text-center mb-12">
                Loading Disqus...
              </h4>
            </div>
          }
        >
          <Disqus
            title={meta.title}
            identifier={`${locale}_${meta.slugOriginal}`}
            path={postPath}
            locale={locale}
          />
        </Suspense>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withMainLayoutPage(BlogDetailPage, ({ contents, locale }) => ({
  locale,
  meta: {
    ...contents.meta,
    slug: `blog/${contents.meta.slugOriginal}`
  }
}));
