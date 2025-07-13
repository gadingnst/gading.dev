import { NextPageProps } from '@/@types/global';
import aboutLocales from '@/modules/About/About.locales';
import ContentInteraction from '@/modules/Common/components/Content/Interaction';
import Banner from '@/modules/Common/components/Header/Banner';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';
import { I18n } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

export async function generateAboutPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generateAboutPathsDefault() {
  return [{}];
}

async function AboutPage(props: NextPageProps) {
  const params = await props.params;
  const lang = params?.lang || getDefaultLanguage();
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
      <section className="base-container py-6 -mt-28">
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
      <ContentInteraction
        path="about"
        identifier="about"
        meta={markdownContent.meta}
      />
    </div>
  );
}

export default AboutPage;
