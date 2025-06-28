import Image from 'next/image';
import Link from 'next/link';
import homePageLocales from './locales';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';

/**
 * HomePage component with internationalization support
 * @param lang - Current language locale
 */
export default async function HomePage() {
  const lang = await getLangugageServer();
  const content = homePageLocales(lang);

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
          {content.title}
        </h1>
        <p className="max-w-xl text-base sm:text-lg opacity-80">
          {content.description}
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

      {/* Features */}
      <section className="px-8 sm:px-20 py-16 bg-base-100">
        <h2 className="text-2xl font-semibold text-center mb-10">{content.featuresTitle}</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-sm leading-relaxed">
          <li className="p-4 rounded-lg bg-base-200">
            {content.feature1}
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            {content.feature2}
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            {content.feature3}
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            {content.feature4}
          </li>
          <li className="p-4 rounded-lg bg-base-200">
            {content.feature5}
          </li>
        </ul>
      </section>

      {/* Getting Started */}
      <section className="px-8 sm:px-20 py-16">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {content.gettingStartedTitle}
        </h2>
        <pre className="bg-neutral text-neutral-content text-sm rounded-lg p-6 overflow-auto whitespace-pre-line">
          git clone https://github.com/gadingnst/fullstack-next-template.git<br />
          cd fullstack-next-template<br />
          npm install<br />
          npm run dev
        </pre>
      </section>

      {/* Footer */}
      <footer className="py-8 flex flex-wrap justify-center gap-6 text-sm opacity-70">
        <Link href="https://nextjs.org/docs" target="_blank" className="link link-hover">
          {content.docsLink}
        </Link>
      </footer>
    </div>
  );
}
