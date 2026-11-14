import { getAllBlogMeta } from '@/modules/Content/services/content-parser';
import { I18n, I18nLocales } from '@/packages/libs/I18n/interface';

export const dynamic = 'force-static';

export interface SearchIndexPost {
  title: string;
  description: string;
  slug: string;
  date: string;
}

export type SearchIndex = Record<I18nLocales, SearchIndexPost[]>;

/**
 * Post titles and descriptions of both languages as one static JSON file,
 * fetched by the command palette the first time it opens.
 */
export async function GET() {
  const langs = Object.keys(I18n) as I18nLocales[];
  const entries = await Promise.all(langs.map(async(lang) => {
    const metas = await getAllBlogMeta(lang);
    const posts: SearchIndexPost[] = metas
      .map(({ meta }) => ({
        title: meta.title,
        description: meta.description,
        slug: meta.slugOriginal,
        date: meta.date
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return [lang, posts] as const;
  }));
  return Response.json(Object.fromEntries(entries) as SearchIndex);
}
