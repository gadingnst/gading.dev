import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment } from 'react';
import { Content, Footer, Navbar, Banner, CardHero, Image, withLayoutPage, Button, Icon, ContentParser } from '@/components';
import { AUTHOR_FULLNAME, AUTHOR_NAME, BASE_URL, DEFAULT_LOCALE } from '@/utils/config';
import { motion } from 'framer-motion';

import iconMail from '@/assets/icons/tools/ios/mail.svg';
import iconBriefcase from '@/assets/icons/tools/ios/briefcase.svg';
import imgProfile from '@/assets/images/authors/gading-talks.jpeg';
import { getContentMultiLanguage, MDContent } from '@/server/content-parser';

type Props = {
  contents: MDContent;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE
  } = ctx;
  const contents = await getContentMultiLanguage('about', locale);
  return {
    props: {
      contents
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
      <Icon size={16} className="mr-4" color="white" src={iconMail} /> Contact
    </Button>
    <Button
      href={`${BASE_URL}/media/cv.pdf`}
      className="flex items-center text-sm rounded-4 px-8 py-4 text-white dark:text-white bg-info mx-8 hover:no-underline"
    >
      <Icon size={14} className="mr-4" color="white" src={iconBriefcase} /> Resume
    </Button>
  </div>
);

const AboutPage: NextPage<Props> = (props) => {
  const { meta, content } = props.contents;
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner bgImage="/media/banners/8.jpg" className="font-courgette text-white util--text-shadow text-center">
        <div className="container -mt-48">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-4xl mb-8 text-white dark:text-white"
          >
            {AUTHOR_NAME}
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
          <div className="relative flex justify-around items-start mb-24 md:mb-32 md:-mx-36">
            <LeftDesc />
            <motion.div
              className="-mt-100 w-[180px] h-[180px] flex flex-1 items-center justify-center"
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.5 }}
            >
              <Image
                classNameWrapper="absolute rounded-full mx-auto shadow-all transition-all hover:-mt-12 mx-auto select-none"
                src={imgProfile}
                alt={AUTHOR_NAME}
                width={180}
                height={180}
                placeholder="blur"
                layout="responsive"
              />
            </motion.div>
            <RightDesc />
          </div>
          <div>
            <div className="mb-32 md:hidden sm:-mt-68">
              <RightDesc className="flex h-[auto] justify-around sm:justify-between sm:px-32 mb-32" />
              <LeftDesc className="flex h-[auto]" />
            </div>
            <h3 className="text-center font-semibold">{AUTHOR_FULLNAME}</h3>
            <hr className="my-28" />
            <ContentParser>
              {content}
            </ContentParser>
          </div>
        </CardHero>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(AboutPage, {
  title: `About ${AUTHOR_FULLNAME}`
});
