import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Fragment, Suspense } from 'react';
import { CardHero, Image, Button, SVG } from '@/components/base';
import { Banner, Content, Navbar, Footer, withMainLayoutPage } from '@/components/layouts';
import ContentParser from '@/components/base/Content/Parser';
import { AUTHOR_FULLNAME, AUTHOR_NAME, BASE_URL, DEFAULT_LOCALE } from '@/utils/config';
import { getContentMultiLanguage, MDContent } from '@/server/content-parser';

import IconMail from '$/assets/icons/tools/mail.svg';
import IconBriefcase from '$/assets/icons/tools/briefcase.svg';
import imgReportDesktop from '$/assets/images/reports/desktop.svg?url';
import imgReportMobile from '$/assets/images/reports/mobile.svg?url';
import imgProfile from '$/assets/images/authors/gading-talks.jpeg';

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
    <div className="group hover:util--text-shadow dark:hover:util--text-shadow-white">
      <div className="transition-transform duration-200 hover:cursor-pointer group-hover:-translate-y-4">
        👨🏻‍💻
      </div>
      <p className="text-light-20 dark:text-light-20">
        Writer,
      </p>
    </div>
    <div className="group hover:util--text-shadow dark:hover:util--text-shadow-white mx-24">
      <div className="transition-transform duration-200 hover:cursor-pointer group-hover:-translate-y-4">
        🧐
      </div>
      <p className="text-light-20 dark:text-light-20">
        Explorer,
      </p>
    </div>
    <div className="group hover:util--text-shadow dark:hover:util--text-shadow-white">
      <div className="transition-transform duration-200 hover:cursor-pointer group-hover:-translate-y-4">
        😴
      </div>
      <p className="text-light-20 dark:text-light-20">
        Slacker
      </p>
    </div>
  </div>
);

const rightDescBtnClasses = 'flex items-center text-sm rounded-4 px-8 py-4 text-white dark:text-white mx-8 hover:no-underline hover:-translate-y-2 hover:shadow-lg active:shadow-sm';
const RightDesc = ({ className = 'hidden md:flex' }) => (
  <div className={`${className} items-center h-[30px] flex-1 justify-center`}>
    <Button
      disableHover
      href="mailto:contact@gading.dev"
      className={`${rightDescBtnClasses} bg-primary active:shadow-primary-2 hover:shadow-primary-2 umami--click--about_contact`}
    >
      <SVG size={16} className="mr-4" fill="white" src={IconMail} /> Contact
    </Button>
    <Button
      disableHover
      href={`${BASE_URL}/resume`}
      className={`${rightDescBtnClasses} bg-info active:shadow-info-2 hover:shadow-info-2 umami--click--about_resume`}
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

const Disqus = dynamic(() => import('@/components/base/Content/Disqus'), {
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
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white animate-[scale_.25s_ease-in-out]">
            {AUTHOR_NAME}
          </h1>
          <p className="opacity-0 text-lg px-8 text-white dark:text-white animate-[y-b-25_.3s_ease-in-out_.2s_1_normal_forwards]">
            {meta.description}”
          </p>
        </div>
      </Banner>
      <Content>
        <CardHero>
          <div className="relative flex justify-around items-start mb-24 md:mb-32 md:-mx-36">
            <LeftDesc />
            <div className="-mt-100 w-[180px] h-[180px] flex flex-1 items-center justify-center opacity-0 animate-[y-t-25_.5s_ease-in-out_.5s_1_normal_forwards]">
              <div className="rounded-full overflow-hidden transition-all shadow-lg hover:shadow-xl hover:-mt-12 active:shadow-md active:scale-95 dark:active:shadow-accent dark:hover:shadow-accent">
                <Image
                  className="rounded-full cursor-grab active:cursor-grabbing"
                  src={imgProfile}
                  alt={AUTHOR_NAME}
                  width={180}
                  height={180}
                  delayLoad={750}
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
            <h3 className="text-center font-semibold mb-36">
              Sutan <span className="text-primary dark:text-accent-2 hover:cursor-pointer hover:underline underline-offset-4">Gading</span> Fadhillah Nasution
            </h3>
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
      title: `About ${AUTHOR_FULLNAME}`,
      slug: 'about',
      date: meta.date,
      description: meta.description,
      keywords: meta.keywords,
      tags: meta.tags
    }
  };
});
