import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';

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
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
        <div className="base-container text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {markdownContent.meta.title}
          </h1>
          <p className="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto">
            {markdownContent.meta.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="base-container">
          <ContentParser>{markdownContent.content}</ContentParser>
        </div>
      </section>
    </div>
  );
}