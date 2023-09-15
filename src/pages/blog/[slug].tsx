import type { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import type { I18nLocales } from '@/types/contents';
import { Fragment, useCallback, useMemo } from 'react';
import { getAllBlogPaths, MDContent, getContent } from '@/server/content-parser';
import CardHero from '@/components/base/Card/Hero';
import ContentInfo from '@/components/base/Content/Info';
import ContentParser from '@/components/base/Content/Parser';
import { Banner, Content, Footer, Navbar, withMainLayoutPage } from '@/components/layouts';
import { DEFAULT_LOCALE } from '@/configs/env';

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
    const _allSlug = Object.values(meta.slug);
    return _allSlug.length > 1 && _allSlug.every(Boolean);
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
