import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment, useMemo } from 'react';
import { Portfolio } from '@/types/contents';
import { DEFAULT_LOCALE } from '@/utils/config';
import { LazyComponentProps, LazyLoadComponent, trackWindowScroll } from 'react-lazy-load-image-component';
import { Card, Image } from '@/components/base';
import { Banner, Content, Footer, Navbar, withMainLayoutPage } from '@/components/layouts';
import createContentLocales from '@/utils/helpers/locales';

type Props = {
  contents: Portfolio[];
  locale: string;
};

interface PortfolioListProps extends LazyComponentProps {
  contents: Portfolio[];
}

const withLocales = createContentLocales({
  desc: {
    en: 'Projects, experiments, and some stuff that I\'ve made.',
    id: 'Proyek, eksperimen, dan beberapa hal yang telah saya buat.'
  }
});

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const { locale = DEFAULT_LOCALE } = ctx;
  const { default: contents } = await import(`@/contents/portfolio/${locale}`)
    .catch((err) => {
      if (err.code === 'MODULE_NOT_FOUND') {
        return import(`@/contents/portfolio/en`);
      }
      throw err;
    });
  return {
    props: {
      contents,
      locale
    }
  };
};

const PortfolioList = trackWindowScroll((props: PortfolioListProps) => {
  const { contents, scrollPosition } = props;
  return (
    <div className="grid grid-cols-1 gap-28 w-full max-w-5xl sm:grid-cols-2 lg:grid-cols-3 -mt-80">
      {contents.map((item, idx) => (
        <LazyLoadComponent key={`${item.image}-${idx}`}>
          <Card hoverEffect className="rounded-12 overflow-hidden">
            <div className="relative w-full overflow-hidden h-[200px]">
              <Image
                zoomable
                src={item.image}
                alt={item.name}
                width="100%"
                height="200px"
                className="object-contain"
                wrapperClassName="w-full"
                scaling={0.5}
                scrollPosition={scrollPosition}
              />
            </div>
            <div className="flex flex-col pt-12 pb-16 px-16">
              <p className="mb-4 text-primary dark:text-primary-2">
                {item.name}
              </p>
              <p className="text-sm">
                {item.description}
              </p>
            </div>
          </Card>
        </LazyLoadComponent>
      ))}
    </div>
  );
});

const PortfolioPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  const locales = useMemo(() => withLocales(locale), [locale]);
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner
        bgImage="/media/banners/2.jpg"
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="container -mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white animate-[scale_.5s_ease-in-out]">
            Portfolio
          </h1>
          <p className="text-lg px-8 text-white dark:text-white opacity-0 animate-[y-b-25_.5s_ease-in-out_.2s_1_normal_forwards]">
            {locales.desc}”
          </p>
        </div>
      </Banner>
      <Content className="flex items-center justify-center">
        <PortfolioList contents={contents} />
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withMainLayoutPage(PortfolioPage, ({ locale }) => {
  return {
    locale,
    meta: {
      title: 'Porfolio',
      keywords: 'gading portfolio, gading works, gading projects, gading repository',
      slug: 'portfolio',
      date: '2022-06-01',
      image: '/media/banners/2.jpg',
      tags: ['portfolio', 'gading', 'works', 'oss', 'expressjs'],
      description: withLocales(locale).desc
    }
  };
});
