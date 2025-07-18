import { NextPageProps } from '@/@types/global';
import ProfileInfo from '@/modules/About/components/ProfileInfo';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import ContentInteraction from '@/packages/components/layouts/Content/Interaction';
import Banner from '@/packages/components/layouts/Header/Banner';
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

  return (
    <div className="min-h-screen flex flex-col text-base-content">
      <Banner
        bgImage={markdownContent.meta.image}
      >
        <section className="font-serif flex flex-col h-full items-center justify-center text-center">
          <div className="base-container relative z-10">
            <div className="liquid-glass-shadow rounded-2xl p-8 -translate-y-6">
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
        <HeroCard>
          <ProfileInfo />
          <ContentParser>
            {markdownContent.content}
          </ContentParser>
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
