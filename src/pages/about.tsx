import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Fragment, Suspense } from 'react';
import { CardHero, Image, Button, SVG } from '@/components/base';
import { Banner, Content, Navbar, Footer, withMainLayoutPage } from '@/components/layouts';
import ContentParser from '@/components/layouts/main/Content/Parser';
import { AUTHOR_FULLNAME, AUTHOR_NAME, BASE_URL, DEFAULT_LOCALE } from '@/utils/config';
import { getContentMultiLanguage, MDContent } from '@/server/content-parser';

import IconMail from '@/assets/icons/tools/ios/mail.svg';
import IconBriefcase from '@/assets/icons/tools/ios/briefcase.svg';
import imgProfile from '@/assets/images/authors/gading-talks.jpeg';
import imgReportDesktop from '@/assets/images/reports/desktop.svg?url';
import imgReportMobile from '@/assets/images/reports/mobile.svg?url';

type Props = {
  contents: MDContent;
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE
  } = ctx;
  const contents = await getContentMultiLanguage('about', locale);
  return {
    props: {
      contents,
      locale
    }
  };
};

const LeftDesc = ({ className = 'hidden md:flex' }) => (
  <div className={`${className} items-center h-[30px] flex-1 justify-center text-center`}>
    <div className="opacity-90">
      <div>👨🏻‍💻</div>
      <p className="text-light-20 dark:text-light-20">Writer,</p>
    </div>
    <div className="mx-24">
      <div>🧐</div>
      <p className="text-light-20 dark:text-light-20">Explorer,</p>
    </div>
    <div>
      <div>😴</div>
      <p className="text-light-20 dark:text-light-20">Slacker</p>
    </div>
  </div>
);

const RightDesc = ({ className = 'hidden md:flex' }) => (
  <div className={`${className} items-center h-[30px] flex-1 justify-center`}>
    <Button
      href="mailto:contact@gading.dev"
      className="flex items-center text-sm rounded-4 px-8 py-4 text-white dark:text-white bg-primary mx-8 hover:no-underline"
    >
      <SVG size={16} className="mr-4" fill="white" src={IconMail} /> Contact
    </Button>
    <Button
      href={`${BASE_URL}/media/cv.pdf`}
      className="flex items-center text-sm rounded-4 px-8 py-4 text-white dark:text-white bg-info mx-8 hover:no-underline"
    >
      <SVG size={14} className="mr-4" fill="white" src={IconBriefcase} /> Resume
    </Button>
  </div>
);

const PerformanceReportsImage = ({ src = imgReportDesktop, alt = 'Performance Report Desktop' }) => {
  return (
    <div className="w-full max-w-[700px] mx-auto mt-24">
      <Image
        zoomable
        src={src}
        alt={alt}
        width="100%"
      />
    </div>
  );
};

const PerformanceReportsDesktop = () => <PerformanceReportsImage />;
const PerformanceReportsMobile = () => <PerformanceReportsImage src={imgReportMobile} />;

const Disqus = dynamic(() => import('@/components/layouts/main/Content/Disqus'), {
  suspense: true
});

const AboutPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  const { meta, content } = contents;
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner bgImage="/media/banners/8.jpg" className="font-courgette text-white util--text-shadow text-center">
        <div className="container -mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white animate-[scale_.5s_ease-in-out]">
            {AUTHOR_NAME}
          </h1>
          <p className="opacity-0 text-lg px-8 text-white dark:text-white animate-[y-b-25_.5s_ease-in-out_.2s_1_normal_forwards]">
            {meta.description}”
          </p>
        </div>
      </Banner>
      <Content>
        <CardHero>
          <div className="relative flex justify-around items-start mb-24 md:mb-32 md:-mx-36">
            <LeftDesc />
            <div className="-mt-100 w-[180px] h-[180px] flex flex-1 items-center justify-center opacity-0 animate-[y-t-25_.75s_ease-in-out_.5s_1_normal_forwards]">
              <div className="rounded-full overflow-hidden transition-all shadow-lg hover:shadow-xl hover:-mt-12 active:shadow-md active:scale-95">
                <Image
                  src={imgProfile}
                  alt={AUTHOR_NAME}
                  width={180}
                  height={180}
                />
              </div>
            </div>
            <RightDesc />
          </div>
          <div>
            <div className="mb-32 md:hidden sm:-mt-68">
              <RightDesc className="flex h-[auto] justify-around sm:justify-between sm:px-32 mb-32" />
              <LeftDesc className="flex h-[auto]" />
            </div>
            <h3 className="text-center font-semibold mb-36">{AUTHOR_FULLNAME}</h3>
            <ContentParser components={{ PerformanceReportsDesktop, PerformanceReportsMobile }}>
              {content}
            </ContentParser>
          </div>
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
            path="about"
            identifier="about"
            title={meta.title}
            locale={locale}
          />
        </Suspense>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withMainLayoutPage(AboutPage, ({ contents, locale }) => {
  const { meta } = contents;
  return {
    locale,
    meta: {
      ...meta,
      title: `About ${AUTHOR_FULLNAME}`,
      slug: 'about'
    }
  };
});
