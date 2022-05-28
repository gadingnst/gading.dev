import { NextPage } from 'next';
import { Fragment } from 'react';
import { Content, Footer, Navbar, Banner, CardHero, withLayoutPage } from '@/components';
import { SITE_NAME } from '@/utils/config';
import { motion } from 'framer-motion';

const HomePage: NextPage = () => {
  return (
    <Fragment>
      <Navbar />
      <Banner bgImage="/media/banners/1.jpg" className="font-courgette text-white util--text-shadow text-center">
        <div className="container -mt-48">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: 'easeInOut', duration: 0.5 }}
            className="font-bold text-4xl mb-8 text-white dark:text-white"
          >
            {SITE_NAME}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeInOut', duration: 0.5, delay: 0.2 }}
            className="text-lg px-8 text-white dark:text-white"
          >
            My work, my blog, even about my life are all here.”
          </motion.p>
        </div>
      </Banner>
      <Content>
        <CardHero>
          <div className="relative flex justify-around mb-56">
            <h2>🚧 Under Construction.</h2>
          </div>
        </CardHero>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withLayoutPage(HomePage, {
  title: 'Gading\'s Hideout'
});
