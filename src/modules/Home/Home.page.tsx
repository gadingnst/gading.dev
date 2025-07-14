import { NextPageProps } from '@/@types/global';
import BlogCardList from '@/modules/Blog/components/CardList';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getBlogList, getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import generateRSSFeed from '@/modules/ContentParser/services/rss-feed';
import withHomeLocales from '@/modules/Home/Home.locales';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';
import Banner from '@/packages/components/layouts/Header/Banner';
import { I18n } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

/**
 * Generate static params for home page with language prefix
 * Generates paths for all supported languages
 */
export async function generateHomePathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

/**
 * Generate static params for home page without language prefix
 * Only generates path for default language
 */
export async function generateHomePathsDefault() {
  await generateRSSFeed();
  return [{}]; // Empty object for root path
}

async function HomePage(props: NextPageProps) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
  const blogList = await getBlogList(lang, { limit: 4 });
  const markdownContent = await getContentMultiLanguage('home', lang);
  const content = withHomeLocales(lang);

  return (
    <div className="min-h-screen flex flex-col text-base-content">
      <Banner
        bgImage={markdownContent.meta.image}
      >
        <section className="font-serif flex flex-col h-full items-center justify-center text-center">
          <div className="base-container relative z-10">
            <div className="liquid-glass-shadow rounded-2xl p-8">
              <h1 className="text-2xl md:text-4xl font-bold">
                {markdownContent.meta.title}
              </h1>
              <p className="text-base sm:text-lg mt-4">
                {markdownContent.meta.description}
              </p>
            </div>
          </div>
        </section>
      </Banner>

      {/* Markdown Content */}
      <section className="base-container py-6 -mt-28">
        <HeroCard className="text-center">
          <ContentParser>
            {markdownContent.content}
          </ContentParser>
          <div className="flex justify-center items-center flex-wrap gap-4">
            <ButtonLink
              withCurrentLocale
              href="/blog"
              data-umami-event="homepage_see-blog"
              className="bg-primary"
            >
              {content.myBlog}
            </ButtonLink>
            <ButtonLink
              withCurrentLocale
              href="/about"
              data-umami-event="homepage_see-about"
              className="bg-accent"
            >
              {content.aboutMe}
            </ButtonLink>
          </div>
          <p className="font-bold text-lg sm:text-xl italic mt-8">
            {content.thansksVisit}.
          </p>
        </HeroCard>
      </section>

      <div className="flex justify-center items-center flex-col my-14">
        <h3 className="font-serif text-2xl font-bold">
          {content.recentPosts}
        </h3>
        <div className="divider w-full max-w-xl mx-auto my-2 px-4" />
        <BlogCardList contents={blogList.contents} />
        <ButtonLink
          withCurrentLocale
          href="/blog"
          data-umami-event="homepage_more-posts"
          className="mt-9 rounded-lg"
        >
          {content.seeMore}
        </ButtonLink>
      </div>
    </div>
  );
}

export default HomePage;
