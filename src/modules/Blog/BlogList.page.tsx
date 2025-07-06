import Banner from '@/modules/Common/components/Header/Banner';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import HeroCard from '@/packages/components/base/Displays/HeroCard';
import LazyImageExample from '@/packages/components/base/Displays/LazyLoad/LazyImage.example';

async function BlogListPage() {
  const lang = await getLangugageServer();
  const markdownContent = await getContentMultiLanguage('about', lang);
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
          <LazyImageExample />
        </HeroCard>
      </section>
    </div>
  );
}

export default BlogListPage;
