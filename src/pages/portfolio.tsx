import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment } from 'react';
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

type Props = {
  contents: Portfolio[];
};

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
      contents
    }
  };
};

const PortfolioPage: NextPage<Props> = (props) => {
  const { contents } = props;
  return (
    <Fragment>
      <Navbar />
      <Banner
        bgImage="/media/banners/2.jpg"
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="-mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white">
            Portfolio
          </h1>
          <p className="text-lg px-8 text-white dark:text-white">
            Projects, experiments, and some stuff that I&apos;ve made.”
          </p>
        </div>
      </Banner>
      <Content className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-28 max-w-5xl sm:grid-cols-2 lg:grid-cols-3 -mt-80">
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
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(PortfolioPage, {
  title: 'Portfolio'
});
