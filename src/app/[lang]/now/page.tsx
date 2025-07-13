import { Metadata } from 'next';

import { getLangugageServer } from '@/modules/Common/libs/i18n/i18n.server';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import nowLocales from '@/modules/Now/Now.locales';
import NowPage, { generateNowPathsWithLang } from '@/modules/Now/Now.page';

export const generateStaticParams = generateNowPathsWithLang;

/**
 * Generate metadata for Now page
 */
export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLangugageServer();
  const content = await getContentMultiLanguage('now', lang);
  const t = nowLocales(lang);

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
 * Now page route component
 */
export default NowPage;