import { GetStaticPathsResult } from 'next';
import Fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import readingTime, { ReadTimeResults } from 'reading-time';
import day from '@/utils/day';
import { I18n } from '@/types/contents';

import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

export interface MetaContents {
  title: string;
  slug: string;
  date: string;
  description: string;
  keywords: string;
  image: string;
  tags: string[];
  readTime: ReadTimeResults;
}

export interface MDContents {
  slug: string;
  content: string;
  meta: MetaContents;
}

export interface MetaLocale {
  meta: MetaContents;
  locale: string;
}

export const rootDir = path.join(process.cwd(), 'src');
export const contentsDir = path.join(rootDir, 'contents');

/**
 *
 * @param filePath - path to file
 * @param language - language of file
 * @returns {Promise<string>} - asynchronous content string
 */
async function readContent(filePath: string, language = 'en'): Promise<string> {
  const files = await Fs.readdir(filePath).catch(() => []);
  const file = files.find((file) => file.endsWith(`${language}.md`) || file.endsWith(`${language}.mdx`));
  let fallbackFile;
  if (files.length === 0) throw new Error(`ERRNOTFOUND: No content found on directory ${filePath}`);
  if (!file) fallbackFile = files.find((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  return Fs.readFile(path.join(filePath, file || fallbackFile as string), 'utf8');
}

/**
 *
 * @param filePath - slug path to file
 * @param language - language of file (default: en)
 * @returns {Promise<MetaContents>} - asynchronous content meta
 */
async function getBlogMeta(filePath: string, language: string): Promise<MetaContents> {
  const fileContents = await readContent(filePath, language);
  const { content, data } = matter(fileContents);
  data.date = day(data.date).format('YYYY-MM-DD');
  const readTime = readingTime(content);
  return { ...data, readTime } as MetaContents;
}

/**
 * @param type - type of content published or drafts
 * @param language - filter language of file 'en'|'id'
 * @returns {Promise<MetaLocale[]>} - asynchronous all blog meta and locale
 */
async function getAllBlogMeta(type: 'published'|'drafts', language?: string): Promise<MetaLocale[]> {
  const postsPath = path.join(contentsDir, 'posts');
  const filePath = path.join(postsPath, type);
  const slugPaths = await Fs.readdir(filePath).catch(() => []);
  const result = await Promise.all(slugPaths.map(async(slugPath) => {
    const blogPaths = path.join(filePath, slugPath);
    if (language) {
      const meta = await getBlogMeta(blogPaths, language);
      return { meta, language };
    }
    const i18n = Object.values(I18n);
    return Promise.all(i18n.map(async lang => {
      const meta = await getBlogMeta(blogPaths, lang);
      return {
        meta,
        locale: lang.replace(/\.(md|mdx)$/, '')
      };
    }));
  }));
  return (language ? result : result.flat(1)) as MetaLocale[];
}

/**
 * Get all published or drafts blog
 * @param language - filter language of file 'en'|'id'
 * @returns {Promise<MetaLocale[]>} - asynchronous published and drafts blog contents
 */
async function getAllBlog(language?: string): Promise<MetaLocale[]> {
  const [published] = await Promise.all([
    getAllBlogMeta('published', language)
    // TODO: add draft blog only on Development Environment
    // IS_DEV ? getAllBlogMeta('drafts', language) : Promise.resolve([])
  ]);
  return [...published];
}

/**
 *
 * @param slugParam - slug of the content
 * @param language - language of the content (default: en)
 * @returns {Promise<MDContents>} - asynchronous content meta & detail
 * @see https://www.learnnext.blog/blogs/lets-build-a-blog-with-tailwind-mdx-bundler-and-next#creating-the-mdxjs-file
 */
export async function parseContent(slugParam: string, language = 'en'): Promise<MDContents> {
  const slug = slugParam.replace(/\.(md|mdx)$/, '');
  const fullPath = path.join(contentsDir, slug);
  const fileContents = await readContent(fullPath, language);
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
        ...(options?.rehypePlugins ?? []),
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
  meta.date = day(meta.date).format('YYYY-MM-DD');
  meta.readTime = readTime;
  return { slug, meta, content } as MDContents;
}

/**
 * Get all blog static paths
 * @returns {Promise<GetStaticPathsResult['paths']>} - asynchronous next static paths
 */
export async function getAllBlogPaths(): Promise<GetStaticPathsResult['paths']> {
  const contents = await getAllBlog();
  return contents.map(({ meta, locale }) => ({
    params: {
      slug: meta.slug
    },
    locale
  }));
}

/**
 *
 * @param language - language of the content (default: en)
 * @returns {Promise<MDContents[]>} - asynchronous all content meta
 */
export async function getBlogList(language = 'en'): Promise<MetaContents[]> {
  const contents = await getAllBlog(language);
  return contents
    .sort((a, b) => {
      const dateA = day(a.meta.date);
      const dateB = day(b.meta.date);
      return dateB.isBefore(dateA) ? -1 : 1;
    })
    .map(({ meta }) => meta);
}
