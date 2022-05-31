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
  ImageLazy
} from '@/components';
import { Portfolio } from '@/types/contents';
import { DEFAULT_LOCALE } from '@/utils/config';
import { LazyComponentProps, trackWindowScroll } from 'react-lazy-load-image-component';

type Props = {
  contents: Portfolio[];
  locale: string;
};

interface PortfolioListProps extends LazyComponentProps {
  contents: Portfolio[];
}

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
      {contents.map(item => (
        <Card hoverEffect className="rounded-12 overflow-hidden" key={item.image}>
          <div className="relative w-full overflow-hidden h-[200px]">
            <ImageLazy
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
      ))}
    </div>
  );
});

const PortfolioPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner
        bgImage="/media/banners/2.jpg"
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="container -mt-48">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-4xl mb-8 text-white dark:text-white"
          >
            Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 }}
            className="text-lg px-8 text-white dark:text-white"
          >
            {
              locale === 'en'
                ? 'Projects, experiments, and some stuff that I\'ve made.'
                : 'Proyek, eksperimen, dan beberapa hal yang telah saya buat.'
            }”
          </motion.p>
        </div>
      </Banner>
      <Content className="flex items-center justify-center">
        <PortfolioList contents={contents} />
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(PortfolioPage, {
  title: 'Portfolio'
});
