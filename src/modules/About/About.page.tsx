import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import Parallax from '@/packages/components/base/Displays/Parallax';

/**
 * AboutPage component with internationalization support
 * Displays content from markdown files in /src/contents/about/
 */
export default async function AboutPage() {
  const lang = await getLangugageServer();

  // Get markdown content from about directory
  const markdownContent = await getContentMultiLanguage('about', lang);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Hero Section with Parallax */}
      <Parallax
        bgImage="/media/default-banners/1.jpg"
        strength={400}
        blur={{ min: -3, max: 10 }}
        className="h-96 sm:h-[500px] lg:h-[600px]"
      >
        <div className="relative h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 to-secondary/60"></div>
          <div className="base-container text-center text-white relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              {markdownContent.meta.title}
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto drop-shadow">
              {markdownContent.meta.description}
            </p>
          </div>
        </div>
      </Parallax>

      {/* Content Section */}
      <section className="py-12">
        <div className="base-container">
          <ContentParser>{markdownContent.content}</ContentParser>
        </div>
      </section>
    </div>
  );
}
