import { NextPage } from 'next';
import { Fragment } from 'react';
import { Content, Footer, Navbar, Banner, CardHero, Image, withLayoutPage, Button, Icon } from '@/components';
import { AUTHOR_NAME } from '@/utils/config';
import { motion } from 'framer-motion';

import iconMail from '@/assets/icons/tools/ios/mail.svg';
import iconBriefcase from '@/assets/icons/tools/ios/briefcase.svg';

import imgProfile from '@/assets/images/authors/gading-talks.jpeg';

const AboutPage: NextPage = () => {
  return (
    <Fragment>
      <Navbar />
      <Banner bgImage="/media/banners/0.jpg" className="font-courgette text-white util--text-shadow text-center">
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
            Just an ordinary Man who turns a ☕️ into beautiful &lt; /&gt;.”
          </motion.p>
        </div>
      </Banner>
      <Content>
        <CardHero>
          <div className="relative flex justify-around items-start mb-56">
            <div className="flex items-center h-[30px] flex-1 justify-center text-center">
              <div>
                <div>👨🏻‍💻</div>
                <p>Writer,</p>
              </div>
              <div className="mx-24">
                <div>🧐</div>
                <p>Explorer,</p>
              </div>
              <div>
                <div>😴</div>
                <p>but Slacker</p>
              </div>
            </div>
            <motion.div
              className="-mt-100 w-[180px] h-[180px] flex flex-1 items-center justify-center"
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.5 }}
            >
              <Image
                classNameWrapper="absolute rounded-full mx-auto shadow-all transition-all hover:-mt-12 mx-auto"
                src={imgProfile}
                alt={AUTHOR_NAME}
                width={180}
                height={180}
                placeholder="blur"
                layout="responsive"
              />
            </motion.div>
            <div className="flex items-center h-[30px] flex-1 justify-center">
              <Button
                href="mailto:contact@gading.dev"
                className="flex items-center text-sm px-8 py-4 text-white dark:text-white bg-info-1 mr-8 hover:no-underline"
              >
                <Icon size={16} className="mr-4" color="white" src={iconMail} /> Contact
              </Button>
              <Button
                href="/media/cv.pdf"
                className="flex items-center text-sm px-8 py-4 text-white dark:text-white bg-accent-1 hover:no-underline"
              >
                <Icon size={14} className="mr-4" color="white" src={iconBriefcase} /> Resume
              </Button>
            </div>
          </div>
          <div>
            <h2 className="text-center">🚧 Under Construction.</h2>
          </div>
        </CardHero>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(AboutPage, {
  title: 'About'
});
