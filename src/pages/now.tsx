import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { CardHero } from '@/components/base';
import { Banner, Content, Footer, Navbar, ContentParser, withMainLayoutPage } from '@/components/layouts';
import { MDContent, getContentMultiLanguage } from '@/server/content-parser';
import { Fragment } from 'react';
import { motion } from 'framer-motion';
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

const NowPage: NextPage<Props> = (props) => {
  const { contents } = props;
  const { meta, content } = contents;
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner
        bgImage={meta.image}
        className="font-courgette text-white util--text-shadow text-center"
      >
        <div className="container -mt-48">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-4xl mb-8 text-white dark:text-white"
          >
            {meta.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 }}
            className="text-lg px-8 text-white dark:text-white"
          >
            {meta.description}”
          </motion.p>
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

export default withMainLayoutPage(NowPage, ({ contents, locale }) => {
  return {
    locale,
    meta: {
      ...contents.meta,
      slug: 'now'
    }
  };
});
