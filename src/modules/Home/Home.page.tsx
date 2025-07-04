import Banner from '@/modules/Common/components/Header/Banner';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import withHomeLocales from '@/modules/Home/Home.locales';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';

async function HomePage() {
  const lang = await getLangugageServer();
  const markdownContent = await getContentMultiLanguage('home', lang);
  const content = withHomeLocales(lang);

  return (
    <div className="min-h-screen flex flex-col text-base-content">
      <Banner
        bgImage={markdownContent.meta.image}
      >
        <section className="font-serif flex flex-col h-full items-center justify-center text-center">
          <div className="base-container relative z-10">
            <div className="liquid-glass-shadow text-base-content rounded-2xl p-8">
              <h1 className="text-contrast text-2xl md:text-4xl font-bold">
                {markdownContent.meta.title}
              </h1>
              <p className="text-base sm:text-lg mt-4 text-shadow">
                {markdownContent.meta.description}
              </p>
            </div>
          </div>
        </section>
      </Banner>

      {/* Markdown Content */}
      <section className="base-container py-12">
        <HeroCard className="text-center">
          <ContentParser>
            {markdownContent.content}
          </ContentParser>
          <div className="flex justify-center items-center flex-wrap my-4">
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
              className="bg-accent mx-2"
            >
              {content.aboutMe}
            </ButtonLink>
          </div>
          <p className="font-bold text-lg sm:text-xl italic mt-8">
            {content.thansksVisit}.
          </p>
        </HeroCard>
      </section>
    </div>
  );
}

export default HomePage;
