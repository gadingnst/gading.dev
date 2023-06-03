import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment, useCallback, useMemo } from 'react';
import { Portfolio } from '@/types/contents';
import { DEFAULT_LOCALE } from '@/configs/env';
import { LazyComponentProps, trackWindowScroll } from 'react-lazy-load-image-component';
import { Button, Card, Image, Link, SVG } from '@/components/base';
import { Banner, Content, Footer, Navbar, withMainLayoutPage } from '@/components/layouts';
import createContentLocales from '@/utils/helpers/locales';

import IconGithub from '$/assets/icons/logo/octocat.svg';

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

const PortfolioList = trackWindowScroll((props: PortfolioListProps) => {
  const { contents, scrollPosition } = props;

  const getProjectSlug = useCallback((projectName: string) => (
    projectName.replace(/\s+/g, '-').toLowerCase()
  ), []);

  return (
    <div className="grid grid-cols-1 gap-28 w-full max-w-5xl sm:grid-cols-2 lg:grid-cols-3 -mt-80 min-h-[500px]">
      {contents.map((item, idx) => (
        <Card key={`${item.image}-${idx}`} hoverEffect className="relative rounded-12 overflow-hidden flex flex-col justify-start">
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
              delayLoad={300}
              scrollPosition={scrollPosition}
            />
          </div>
          <div className="flex flex-col pt-12 pb-16 px-16">
            <div className="flex justify-between items-start">
              <Link
                href={item.link || ''}
                className="mb-4 text-primary dark:text-primary-2 hover:underline inline-block"
                {...(!item.link ? {} : {
                  'data-umami-event': `portfolio_link-${getProjectSlug(item.name)}`
                })}
              >
                {item.name}
              </Link>
              <span className="mt-4 text-xs text-accent-1 dark:text-accent-1">{item.year}</span>
            </div>
            <p className="text-sm">
              {item.description}
            </p>
          </div>
          {item.github && (
            <div className="w-full flex items-end justify-end mt-8 flex-1 pb-8 px-8">
              <Button
                disableHover
                href={item.github}
                delay={300}
                data-umami-event={`portfolio_github-${getProjectSlug(item.name)}`}
                className="bg-github shadow-lg rounded-8 p-12 mx-4 my-4 hover:-translate-y-2"
              >
                <SVG fill="white" size={14} src={IconGithub} />
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
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
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white animate-[scale_.25s_ease-in-out]">
            Portfolio
          </h1>
          <p className="text-lg px-8 text-white dark:text-white opacity-0 animate-[y-b-25_.3s_ease-in-out_.2s_1_normal_forwards]">
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
