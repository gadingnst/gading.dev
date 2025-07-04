import { Metadata } from 'next';

import aboutLocales from '@/modules/About/About.locales';
import AboutPage from '@/modules/About/About.page';
import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';

/**
 * Generate metadata for About page
 */
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLangugageServer();
  const content = await getContentMultiLanguage('about', lang);
  const t = aboutLocales(lang);

  return {
    title: content.meta.title || t.pageTitle,
    description: content.meta.description || t.metaDescription,
    keywords: content.meta.keywords,
    openGraph: {
      title: content.meta.title || t.pageTitle,
      description: content.meta.description || t.metaDescription,
      images: content.meta.image ? [content.meta.image] : undefined,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: content.meta.title || t.pageTitle,
      description: content.meta.description || t.metaDescription,
      images: content.meta.image ? [content.meta.image] : undefined
    }
  };
}

/**
 * About page route component
 */
export default AboutPage;
