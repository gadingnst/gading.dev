import { NextPageProps } from '@/@types/global';
import generateRSSFeed from '@/modules/Content/services/rss-feed';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

import Hero from './components/Hero';
import LatestWriting from './components/LatestWriting';
import Projects from './components/Projects';

/**
 * Generate static params for home page with language prefix
 * Generates paths for all supported languages
 */
export async function generateHomePathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

/**
 * Generate static params for home page without language prefix
 * Only generates path for default language
 */
export async function generateHomePathsDefault() {
  await generateRSSFeed();
  return [{}]; // Empty object for root path
}

async function HomePage(props: NextPageProps) {
  const params = await props.params;
  const lang = (params?.lang || getDefaultLanguage()) as I18nLocales;

  return (
    <div className="min-h-screen text-base-content">
      <div className="wide-container">
        <Hero lang={lang} />
        <Projects lang={lang} />
        <LatestWriting lang={lang} />
      </div>
    </div>
  );
}

export default HomePage;
