import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import ContentParser from '@/modules/ContentParser/components/Parser';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import { Parallax } from '@/packages/components/base/Displays';
import { NextLink } from '@/packages/components/base/Navigations';

import homePageLocales from './locales';

/**
 * HomePage component with internationalization support
 * @param lang - Current language locale
 */
export default async function HomePage() {
  const lang = await getLangugageServer();
  const content = homePageLocales(lang);

  // Get markdown content from home directory
  const markdownContent = await getContentMultiLanguage('home', lang);

  return (
    <div className="min-h-screen flex flex-col bg-base-200 text-base-content">
      {/* Hero with Parallax */}
      <Parallax
        bgImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
        strength={300}
        blur={{ min: -5, max: 15 }}
        className="flex-1"
      >
        <section className="flex-1 flex flex-col items-center justify-center text-center pt-24 pb-12 gap-6 min-h-screen">
          <div className="base-container relative z-10">
            <div className="bg-base-100/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-base-content">
                {markdownContent.meta.title}
              </h1>
              <p className="text-base sm:text-lg opacity-80 mt-4 text-base-content">
                {markdownContent.meta.description}
              </p>

              {/* Credit */}
              <p className="text-xs sm:text-sm opacity-60 text-base-content">
                <NextLink
                  href="https://gading.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-hover"
                >
                  Gading&nbsp;Nasution
                </NextLink>
              </p>

              <div className="flex flex-wrap gap-4 mt-4 justify-center items-center">
                <NextLink
                  href="https://github.com/gadingnst/fullstack-next-template"
                  target="_blank"
                  className="btn btn-primary"
                >
                  {content.starButton}
                </NextLink>
                <NextLink
                  href="https://vercel.com/new/git/external?repository-url=https://github.com/gadingnst/fullstack-next-template"
                  target="_blank"
                  className="btn btn-outline"
                >
                  {content.deployButton}
                </NextLink>
              </div>
            </div>
          </div>
        </section>
      </Parallax>

      {/* Markdown Content */}
      <section className="py-12">
        <div className="base-container">
          <ContentParser>{markdownContent.content}</ContentParser>
        </div>
      </section>
    </div>
  );
}
