import { I18n } from '@/packages/libs/I18n/interface';

/** every docs page is one static page per language, plus the unprefixed default */
export async function generateDocsPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generateDocsPathsDefault() {
  return [{}];
}

export const DOCS_PAGES = [
  { key: 'overview', href: '/docs' },
  { key: 'pipeline', href: '/docs/content-pipeline' },
  { key: 'colors', href: '/docs/colors' },
  { key: 'typography', href: '/docs/typography' },
  { key: 'components', href: '/docs/components' }
] as const;

export type DocsPageKey = typeof DOCS_PAGES[number]['key'];
