import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { CardHero } from '@/components/base';
import { Banner, Content, Footer, Navbar, withMainLayoutPage } from '@/components/layouts';
import ContentParser from '@/components/base/Content/Parser';
import { MDContent, getContentMultiLanguage } from '@/server/content-parser';
import { Fragment, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { DEFAULT_LOCALE } from '@/utils/config';

type Props = {
  contents: MDContent;
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE
  } = ctx;
  const contents = await getContentMultiLanguage('now', locale);
  return {
    props: {
      contents,
      locale
    }
  };
};

const Disqus = dynamic(() => import('@/components/base/Content/Disqus'), {
  suspense: true
});

const NowPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  const { meta, content } = contents;
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner
        bgImage={meta.image}
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="container -mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white animate-[scale_.25s_ease-in-out]">
            {meta.title}
          </h1>
          <p className="text-lg px-8 text-white dark:text-white opacity-0 animate-[y-b-25_.3s_ease-in-out_.2s_1_normal_forwards]">
            {meta.description}”
          </p>
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
            <div className="container max-w-5xl mt-40 mx-auto">
              <h4 className="text-center mb-12">
                Loading Disqus...
              </h4>
            </div>
          }
        >
          <Disqus
            path="now"
            identifier="now"
            title={meta.title}
            locale={locale}
          />
        </Suspense>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withMainLayoutPage(NowPage, ({ contents, locale }) => {
  return {
    locale,
    meta: {
      ...contents.meta,
      slug: 'now'
    }
  };
});
