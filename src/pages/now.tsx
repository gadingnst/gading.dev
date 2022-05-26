import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Content, Footer, Navbar, Banner, CardHero, ContentParser, withLayoutPage } from '@/components';
import { MDContents, parseContent } from '@/server/content-parser';
import { Fragment } from 'react';

type Props = {
  contents: MDContents;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const { locale } = ctx;
  const contents = await parseContent('now', locale);
  return {
    props: {
      contents
    }
  };
};

const NowPage: NextPage<Props> = (props) => {
  const { contents } = props;
  const { meta, content } = contents;
  return (
    <Fragment>
      <Navbar />
      <Banner
        bgImage={meta.image}
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="-mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white">
            {meta.title}
          </h1>
          <p className="text-lg px-8 text-white dark:text-white">
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
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(NowPage, (props) => {
  const { title } = props.contents.meta;
  return {
    title
  };
});
