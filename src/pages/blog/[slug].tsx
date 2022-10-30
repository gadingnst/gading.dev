import type { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { I18nLocales } from '@/types/contents';
import { Fragment, Suspense, useCallback, useMemo } from 'react';
import { getAllBlogPaths, MDContent, getContent } from '@/server/content-parser';
import CardHero from '@/components/base/Card/Hero';
import ContentInfo from '@/components/base/Content/Info';
import ContentParser from '@/components/base/Content/Parser';
import { Banner, Content, Footer, Navbar, withMainLayoutPage } from '@/components/layouts';
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

const Share = dynamic(() => import('@/components/base/Content/Share'), {
  suspense: true
});

const Disqus = dynamic(() => import('@/components/base/Content/Disqus'), {
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
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl mb-8 text-white dark:text-white underline underline-offset-4 opacity-0 animate-[y-t-25_.25s_ease-in-out_.1s_1_normal_forwards]">
            {meta.title}
          </h1>
          <p className="text-base sm:text-lg px-8 text-white dark:text-white opacity-0 animate-[y-b-25_.3s_ease-in-out_.2s_1_normal_forwards]">
            {meta.description}”
          </p>
          <div className="opacity-0 animate-[y-b-25_.5s_ease-in-out_.3s_1_normal_forwards]">
            <ContentInfo
              meta={meta}
              locale={locale}
              className="font-poppins text-xs mt-12 opacity-95"
              colorClassName="text-light-50 dark:text-light-50"
            />
          </div>
        </div>
      </Banner>
      <Content>
        <CardHero>
          <ContentParser>
            {content}
          </ContentParser>
        </CardHero>
        <script async defer src="https://platform.twitter.com/widgets.js" charSet="utf-8" />
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
