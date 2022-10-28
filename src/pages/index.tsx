import type { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { Fragment, useMemo } from 'react';
import { CardHero, Button } from '@/components/base';
import { Banner, Navbar, Footer, Content, withMainLayoutPage } from '@/components/layouts';
import BlogCardList from '@/components/layouts/blog/CardList';
import ContentParser from '@/components/base/Content/Parser';
import { DEFAULT_LOCALE } from '@/utils/config';
import { ContentMeta, getBlogList, getContentMultiLanguage, MDContent } from '@/server/content-parser';
import generateRSSFeed from '@/server/feed-rss';
import createContentLocales from '@/utils/helpers/locales';

type Props = {
  contents: MDContent;
  blogs: ContentMeta[];
  locale: string;
};

export const getStaticProps = async(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> => {
  const {
    locale = DEFAULT_LOCALE
  } = ctx;
  const [contents, { contents: blogs }] = await Promise.all([
    getContentMultiLanguage('home', locale),
    getBlogList(locale, { limit: 4 }),
    generateRSSFeed()
  ]);
  return {
    props: {
      contents,
      blogs,
      locale
    }
  };
};

const withLocales = createContentLocales({
  myBlog: {
    en: 'Read my blog',
    id: 'Baca blog saya'
  },
  myPortfolio: {
    en: 'See my portfolio',
    id: 'Lihat portfolio saya'
  },
  aboutMe: {
    en: 'Learn more about me',
    id: 'Cari tahu tentang saya'
  },
  thansksVisit: {
    en: 'Thanks for visiting me',
    id: 'Terima kasih sudah berkunjung'
  },
  recentPosts: {
    en: 'Recent posts',
    id: 'Tulisan terbaru'
  },
  seeMore: {
    en: 'See more posts',
    id: 'Lihat tulisan lainnya'
  }
});

const btnClasses = 'text-white text-sm sm:text-base dark:text-white rounded-8 my-4 hover:shadow-lg active:shadow-sm hover:-translate-y-2';

const HomePage: NextPage<Props> = (props) => {
  const { contents, blogs, locale } = props;
  const { meta, content } = contents;
  const locales = useMemo(() => withLocales(locale), [locale]);
  return (
    <Fragment>
      <Navbar localeChange />
      <Banner bgImage="/media/banners/1.jpg" className="font-courgette text-white util--text-shadow text-center">
        <div className="container -mt-48">
          <h1 className="font-bold text-4xl mb-8 text-white dark:text-white animate-[scale_.25s_ease-in-out]">
            {meta.title}
          </h1>
          <p className="text-lg px-8 text-white dark:text-white opacity-0 animate-[y-b-25_.3s_ease-in-out_.2s_1_normal_forwards]">
            {meta.description}”
          </p>
        </div>
      </Banner>
      <Content>
        <CardHero className="min-h-[0px]">
          <ContentParser className="text-center">
            {content}
          </ContentParser>
          <div className="flex justify-center items-center flex-wrap text-center my-16">
            <Button
              disableHover
              text={locales.myBlog}
              href="/blog"
              className={`${btnClasses} bg-primary active:shadow-primary-2 hover:shadow-primary-2 umami--click--homepage_see-blog`}
            />
            <Button
              disableHover
              text={locales.aboutMe}
              href="/about"
              className={`${btnClasses} bg-accent active:shadow-accent-2 hover:shadow-accent-2 mx-8 umami--click--homepage_see-about`}
            />
            <Button
              disableHover
              text={locales.myPortfolio}
              href="/portfolio"
              className={`${btnClasses} bg-info active:shadow-info-2 hover:shadow-info-2 umami--click--homepage_see-portfolio`}
            />
          </div>
          <h5 className="font-bold italic text-center mt-8">
            {locales.thansksVisit}.
          </h5>
        </CardHero>
        <div className="flex justify-center items-center flex-col my-40 opacity-0 animate-[y-b-25_.5s_ease-in-out_.75s_1_normal_forwards]">
          <h3 className="font-courgette">
            {locales.recentPosts}
          </h3>
          <hr className="w-full mt-16" />
          <BlogCardList contents={blogs} locale={locale} />
          <Button href="/blog" className="text-white dark:text-white mt-36 bg-primary rounded-8 umami--click--homepage_more-posts">
            {locales.seeMore}...
          </Button>
        </div>
      </Content>
      <Footer />
    </Fragment>
  );
};

export default withMainLayoutPage(HomePage, (props) => {
  const { contents, locale } = props;
  const { meta } = contents;
  return {
    locale,
    meta: {
      title: 'Sutan Gading Fadhillah Nasution',
      slug: '',
      date: meta.date,
      description: meta.description,
      keywords: meta.keywords,
      tags: meta.tags
    }
  };
});
