import type { ReadTimeResults } from 'reading-time';

export enum I18n {
  en = 'en_US',
  id = 'id_ID',
}

export type I18nLocales = keyof typeof I18n;

export interface ContentSlug {
  en: string;
  id: string;
}

export interface ContentMeta {
  title: string;
  slug: ContentSlug;
  slugOriginal: string;
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
