import aboutLocales from '@/modules/About/About.locales';
import Banner from '@/modules/Common/components/Header/Banner';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';

/**
 * AboutPage component with internationalization support
 * Displays content from markdown files in /src/contents/about/
 */
export default async function AboutPage() {
  const lang = await getLangugageServer();
  const markdownContent = await getContentMultiLanguage('about', lang);
  const content = aboutLocales(lang);

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
        <HeroCard>
          <ContentParser>
            {markdownContent.content}
          </ContentParser>
          <div className="flex justify-center items-center flex-wrap text-center my-4">
            <ButtonLink
              withCurrentLocale
              href="/"
              data-umami-event="aboutpage_back-home"
              className="bg-primary"
            >
              {content.backToHome}
            </ButtonLink>
            <ButtonLink
              withCurrentLocale
              href="/contact"
              data-umami-event="aboutpage_contact"
              className="bg-accent mx-2"
            >
              {content.contactMe}
            </ButtonLink>
          </div>
        </HeroCard>
      </section>
    </div>
  );
}
