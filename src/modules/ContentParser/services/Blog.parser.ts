import Fs from 'fs/promises';
import Path from 'path';

import Matter from 'gray-matter';
import readingTime from 'reading-time';

import { ContentBlogList, ContentMeta, I18n, MetaLocale } from '@/@types/contents';
import { BLOG_PAGINATION_LIMIT, DEFAULT_LOCALE } from '@/configs/env';
import { contentsDir } from '@/modules/ContentParser/services/constants';
import dt from '@/packages/utils/dt';

interface BlogLimit {
  limit?: number;
  offset?: number;
}

/**
 * Get blog meta information
 * @param slug - slug file with extension
 * @returns {Promise<ContentMeta>} - asynchronous content meta
 */
export async function getBlogMeta(slug: string, language = DEFAULT_LOCALE): Promise<ContentMeta> {
  const blogFile = Path.join(contentsDir, 'posts', language, slug);
  const fileContents = await Fs.readFile(blogFile, 'utf8');
  const { content, data } = Matter(fileContents);
  const date = dt(data.date).format('YYYY-MM-DD');
  const slugOriginal = data.slug[language];
  const readTime = readingTime(content);
  return {
    ...data,
    slugOriginal,
    date,
    readTime
  } as ContentMeta;
}

/**
 * Get all blog meta information
 * @param language - filter language of file 'en'|'id'
 * @returns {Promise<MetaLocale[]>} - asynchronous all blog meta and locale
 */
export async function getAllBlogMeta(language = DEFAULT_LOCALE): Promise<MetaLocale[]> {
  const postsPath = Path.join(contentsDir, 'posts', language);
  const slugPaths = await Fs.readdir(postsPath).catch(() => []);
  const result = await Promise.all(slugPaths.map(async(slug) => {
    const meta = await getBlogMeta(slug, language);
    return { meta, locale: language };
  }));
  return result;
}

/**
 * Get all blog static paths
 */
export async function getAllBlogPaths() {
  const paths = await Promise.all(Object.keys(I18n).map(getAllBlogMeta));
  return paths.flat(1).map(({ meta, locale }) => ({
    params: {
      slug: meta.slugOriginal
    },
    locale
  }));
}

/**
 * Get blog list by language
 * @param language - language of the content (default: en)
 * @returns {Promise<MDContent[]>} - asynchronous all content meta
 */
export async function getBlogList(language = DEFAULT_LOCALE, limitOptions?: BlogLimit): Promise<ContentBlogList> {
  const {
    limit = BLOG_PAGINATION_LIMIT,
    offset = 0
  } = limitOptions || {};
  const blogs = await getAllBlogMeta(language);
  const blogsSortedByDate = blogs.sort((a, b) => {
    const dateA = dt(a.meta.date);
    const dateB = dt(b.meta.date);
    return dateB.isBefore(dateA) ? -1 : 1;
  });
  const result = limit ? blogsSortedByDate.slice(offset, limit) : blogsSortedByDate;
  const contents = result.map(({ meta }) => meta);
  return {
    contents,
    total: blogs.length
  };
}
