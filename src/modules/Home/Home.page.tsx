import Image from 'next/image';
import Link from 'next/link';
import homePageLocales from './locales';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import ContentParser from '@/modules/ContentParser/components/Parser';

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
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-8 pt-24 pb-12 gap-6">
        <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={200}
          height={42}
          className="dark:invert"
          priority
        />
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          {markdownContent.meta.title}
        </h1>
        <p className="max-w-xl text-base sm:text-lg opacity-80">
          {markdownContent.meta.description}
        </p>

        {/* Credit */}
        <p className="text-xs sm:text-sm opacity-60">
          {content.creditBy}{' '}
          <Link
            href="https://gading.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Gading&nbsp;Nasution
          </Link>
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href="https://github.com/gadingnst/fullstack-next-template"
            target="_blank"
            className="btn btn-primary"
          >
            {content.starButton}
          </Link>
          <Link
            href="https://vercel.com/new/git/external?repository-url=https://github.com/gadingnst/fullstack-next-template"
            target="_blank"
            className="btn btn-outline"
          >
            {content.deployButton}
          </Link>
        </div>
      </section>

      {/* Markdown Content */}
      <section className="max-w-4xl mx-auto px-8 py-12">
        <ContentParser>{markdownContent.content}</ContentParser>
      </section>
    </div>
  );
}
