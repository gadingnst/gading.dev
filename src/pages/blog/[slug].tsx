import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Content, Footer, Navbar, Banner, CardHero, withLayoutPage, ContentParser, ContentInfo } from '@/components';
import {
  getAllBlogPaths,
  MDContent,
  getContent
} from '@/server/content-parser';
import { DEFAULT_LOCALE } from '@/utils/config';
import { I18nLocales } from '@/types/contents';

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

const BlogDetailPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  const { meta, content } = contents;

  const localeChange = useMemo(() => {
    return Object.values(meta.slug).every(Boolean);
  }, [meta.slug]);

  const onLocaleChange = useCallback((i18nLocale: I18nLocales) => {
    return meta.slug[i18nLocale];
  }, []);

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
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(BlogDetailPage, (props) => {
  const { title } = props.contents.meta;
  return {
    title
  };
});
