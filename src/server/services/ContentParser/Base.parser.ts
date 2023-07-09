import Fs from 'fs/promises';
import Path from 'path';
import Matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';
import rehypeResponsiveTables from 'rehype-responsive-tables';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import dt from '@/packages/utils/dt';
import { MDContent } from '@/@types/contents';
import { DEFAULT_LOCALE } from '@/configs/env';
import { contentsDir, rootDir } from '@/server/services/ContentParser/constants';

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
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        rehypeKatex,
        [
          rehypeResponsiveTables,
          {
            up: ['*']
          }
        ],
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
  const source = Matter(fileContents).content;
  const { code: content, frontmatter: meta } = result;
  const readTime = readingTime(source);
  meta.date = dt(meta.date).format('YYYY-MM-DD');
  meta.readTime = readTime;
  if (meta?.slug) {
    meta.slugOriginal = meta.slug[locale];
  }
  return {
    meta,
    content
  } as MDContent;
}

/**
 * Get multi language content with one slug path
 * @param contentPath - path to content
 * @param language - language of the content 'en'|'id'
 * @returns {Promise<MDContent>} - asynchronous content string
 */
export async function getContentMultiLanguage(contentPath: string, language = DEFAULT_LOCALE): Promise<MDContent> {
  const filePath = Path.join(contentsDir, contentPath);
  const files = await Fs.readdir(filePath).catch(() => []);
  const file = files.find((file) => file.endsWith(`${language}.md`) || file.endsWith(`${language}.mdx`));
  let fallbackFile;
  if (files.length === 0) throw new Error(`ERRNOTFOUND: No content found on directory ${filePath}`);
  if (!file) fallbackFile = files.find((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  const fileContents = await Fs.readFile(Path.join(filePath, file || fallbackFile as string), 'utf8');
  return parseContent(fileContents, language);
}

/**
 * Get content by slug path
 * @param slug - content slug
 * @param language - language of the content 'en'|'id'
 * @returns {Promise<MDContent>} - asynchronous content string
 */
export async function getContent(slug: string, language = DEFAULT_LOCALE): Promise<MDContent> {
  const filePath = Path.join(contentsDir, 'posts', language, slug);
  const fileContents = await Fs.readFile(`${filePath}.md`, 'utf8')
    .catch(async(err) => {
      if (err.code === 'ENOENT' && err.message.includes('.md')) {
        try {
          const _result = await Fs.readFile(`${filePath}.mdx`, 'utf8');
          return _result;
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
