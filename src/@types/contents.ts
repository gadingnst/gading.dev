import type { ReadTimeResults } from 'reading-time';

import type { I18nLocales } from '@/@types/i18n';

export type ContentSlug = {
  [locale in I18nLocales]: string;
};

export type ContentSlugWithOriginal = ContentSlug & {
  original: string;
};

export interface ContentMeta {
  title: string;
  slug: ContentSlugWithOriginal;
  date: string;
  description: string;
  keywords: string;
  image: string;
  tags: string[];
  readTime: ReadTimeResults;
}

export interface ContentBlogList {
  contents: ContentMeta[];
  total: number;
}

export interface MDContent {
  meta: ContentMeta;
  content: string;
}

export interface MetaLocale {
  meta: ContentMeta;
  locale: string;
}
