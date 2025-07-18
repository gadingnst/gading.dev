import Fs from 'fs/promises';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import readingTime, { ReadTimeResults } from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { BLOG_PAGINATION_LIMIT, DEFAULT_LOCALE } from '@/configs/sites';
import dt from '@/packages/libs/DayJS/dt';
import { I18n } from '@/packages/libs/I18n/interface';

export interface ContentSlug {
  en: string;
  id: string;
}

interface Pagination {
  total: number;
  pageCount: number;
  limit: number;
}

interface BlogListParam {
  pageCurrent?: number;
  limit?: number;
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
  pagination: Pagination;
}

export interface MDContent {
  meta: ContentMeta;
  content: string;
  source: string;
}

export interface MetaLocale {
  meta: ContentMeta;
  locale: string;
}

export const rootDir = path.join(process.cwd(), 'src');
export const contentsDir = path.join(rootDir, 'contents');

/**
 *
 * @param fileContents - string file content that have to be read
 * @returns {Promise<MDContent>} - asynchronous content meta & detail
 * @see https://www.learnnext.blog/blogs/lets-build-a-blog-with-tailwind-mdx-bundler-and-next#creating-the-mdxjs-file
 */
async function parseContent(fileContents: string, locale: string): Promise<MDContent> {
  const result = await bundleMDX({
    source: fileContents,
    cwd: rootDir,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGfm,
        remarkMath
      ];
      options.rehypePlugins = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(options?.rehypePlugins ?? []) as any[],
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        rehypeKatex,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['hash-anchor']
            }
          }
        ]
      ];
      return options;
    }
  });
  const source = matter(fileContents).content;
  const { code: content, frontmatter: meta } = result;
  const readTime = readingTime(source);
  meta.date = dt(meta.date).format('YYYY-MM-DD');
  meta.readTime = readTime;
  if (meta?.slug) {
    meta.slugOriginal = meta.slug[locale];
  }
  return {
    meta,
    content,
    source
  } as MDContent;
}

/**
 * Get blog meta information
 * @param slug - slug file with extension
 * @returns {Promise<ContentMeta>} - asynchronous content meta
 */
export async function getBlogMeta(slug: string, language = DEFAULT_LOCALE): Promise<ContentMeta> {
  const blogFile = path.join(contentsDir, 'posts', language, slug);
  const fileContents = await Fs.readFile(blogFile, 'utf8');
  const { content, data } = matter(fileContents);
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
  const postsPath = path.join(contentsDir, 'posts', language);
  const slugPaths = await Fs.readdir(postsPath).catch(() => []);
  const result = await Promise.all(slugPaths.map(async(slugWithExtension) => {
    // Remove file extension to get clean slug
    const slug = slugWithExtension.replace(/\.(md|mdx)$/, '');
    const meta = await getBlogMeta(slugWithExtension, language);
    // Override slugOriginal with clean slug if meta.slug doesn't exist
    if (!meta.slug || !meta.slug[language as keyof ContentSlug]) {
      meta.slugOriginal = slug;
    }
    return { meta, locale: language };
  }));
  return result;
}

/**
 * Get all blog static paths
 * @returns {Promise<GetStaticPathsResult['paths']>} - asynchronous next static paths
 */
export async function getAllBlogPaths() {
  const paths = await Promise.all(Object.keys(I18n).map(getAllBlogMeta));
  return paths.flat(1).map(({ meta, locale }) => ({
    lang: locale,
    slug: meta.slugOriginal
  }));
}

/**
 * Get blog list by language
 * @param language - language of the content (default: en)
 * @returns {Promise<MDContent[]>} - asynchronous all content meta
 */
export async function getBlogList(language = DEFAULT_LOCALE, params?: BlogListParam): Promise<ContentBlogList> {
  const { pageCurrent = 1, limit = BLOG_PAGINATION_LIMIT } = params || {};
  const blogs = await getAllBlogMeta(language);
  const blogsSortedByDate = blogs.sort((a, b) => {
    const dateA = dt(a.meta.date);
    const dateB = dt(b.meta.date);
    return dateB.isBefore(dateA) ? -1 : 1;
  });

  const offset = (pageCurrent - 1) * limit;
  const result = blogsSortedByDate.slice(offset, offset + limit);

  const contents = result.map(({ meta }) => meta);
  return {
    contents,
    pagination: {
      total: blogs.length,
      pageCount: Math.ceil(blogs.length / limit),
      limit
    }
  };
}

/**
 * Get multi language content with one slug path
 * @param contentPath - path to content
 * @param language - language of the content 'en'|'id'
 * @returns {Promise<MDContent>} - asynchronous content string
 */
export async function getContentMultiLanguage(contentPath: string, language = DEFAULT_LOCALE): Promise<MDContent> {
  const filePath = path.join(contentsDir, contentPath);
  const files = await Fs.readdir(filePath).catch(() => []);
  const file = files.find((file) => file.endsWith(`${language}.md`) || file.endsWith(`${language}.mdx`));
  let fallbackFile;
  if (files.length === 0) throw new Error(`ERRNOTFOUND: No content found on directory ${filePath}`);
  if (!file) fallbackFile = files.find((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  const fileContents = await Fs.readFile(path.join(filePath, file || fallbackFile as string), 'utf8');
  return parseContent(fileContents, language);
}

/**
 * Get content by slug path
 * @param slug - content slug
 * @param language - language of the content 'en'|'id'
 * @returns {Promise<MDContent>} - asynchronous content string
 */
export async function getContent(slug: string, language = DEFAULT_LOCALE): Promise<MDContent> {
  const filePath = path.join(contentsDir, 'posts', language, slug);
  const fileContents = await Fs.readFile(`${filePath}.md`, 'utf8')
    .catch(async(err) => {
      if (err.code === 'ENOENT' && err.message.includes('.md')) {
        try {
          const _result = await Fs.readFile(`${filePath}.mdx`, 'utf8');
          return _result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (_err: any) {
          if (_err.code === 'ENOENT' && _err.message.includes('.mdx')) {
            const _result = await Fs.readFile(`${filePath}.generated.mdx`, 'utf-8');
            return _result;
          }
          return null;
        }
      }
      throw err;
    });

  return parseContent(fileContents ?? '', language);
}
