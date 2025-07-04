import Banner from '@/modules/Common/components/Header/Banner';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';

export default async function HomePage() {
  const lang = await getLangugageServer();

  // Get markdown content from home directory
  const markdownContent = await getContentMultiLanguage('home', lang);

  return (
    <div className="min-h-screen flex flex-col text-base-content">
      <Banner
        bgImage={markdownContent.meta.image}
      >
        <section className="font-serif flex flex-col h-full items-center justify-center">
          <div className="base-container relative z-10">
            <div className="liquid-glass-shadow text-base-content rounded-2xl p-8 text-center">
              <h1 className="text-shadow-lg">
                {markdownContent.meta.title}
              </h1>
              <p className="text-base sm:text-lg mt-4 text-shadow-2xs">
                {markdownContent.meta.description}
              </p>
            </div>
          </div>
        </section>
      </Banner>

      {/* Markdown Content */}
      <section className="py-12">
        <div className="base-container">
          <HeroCard>
            <ContentParser>{markdownContent.content}</ContentParser>
          </HeroCard>
        </div>
      </section>
    </div>
  );
}
