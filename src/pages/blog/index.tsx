import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment } from 'react';
import {
  Content,
  Footer,
  Navbar,
  Banner,
  Card,
  withLayoutPage,
  Link,
  ImageLazy,
  ContentInfo
} from '@/components';
import { getBlogList, MetaContents } from '@/server/content-parser';

type Props = {
  contents: MetaContents[];
  locale?: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const { locale } = ctx;
  const contents = await getBlogList(locale);
  return {
    props: {
      contents,
      locale
    }
  };
};

const BlogListPage: NextPage<Props> = (props) => {
  const { contents, locale } = props;
  return (
    <Fragment>
      <Navbar />
      <Banner
        bgImage="/media/banners/5.jpg"
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="-mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white">
            Blog
          </h1>
          <p className="text-lg px-8 text-white dark:text-white">
            Coding, work, life, and whatever i want.”
          </p>
        </div>
      </Banner>
      <Content className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-28 max-w-5xl sm:grid-cols-2 -mt-80">
          {contents.map(item => (
            <Card hoverEffect className="rounded-12 overflow-hidden" key={item.slug}>
              <div className="relative w-full overflow-hidden h-[200px]">
                <ImageLazy
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full"
                  wrapperClassName="w-full"
                  width="100%"
                  height={200}
                  placeholderScaling={0.075}
                />
              </div>
              <div className="flex flex-col pt-12 pb-16 px-16">
                <div className="flex flex-col justify-between items-center min-h-[50px]">
                  <div className="w-full text-center">
                    <Link
                      href="/blog/[slug]"
                      asPath={`/blog/${item.slug}`}
                      className="mb-4 text-primary dark:text-primary-2"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <ContentInfo
                    className="flex my-8 text-xs"
                    meta={item}
                    locale={locale}
                  />
                </div>
                <hr className="w-full mt-0 mb-12" />
                <p className="text-center text-sm">
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

export default withLayoutPage(BlogListPage, {
  title: 'Blog'
});
