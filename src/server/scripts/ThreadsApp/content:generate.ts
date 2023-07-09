/* eslint-disable no-console */
import Fs from 'fs/promises';
import matter from 'gray-matter';
import dayjs from 'dayjs';
import readingTime from 'reading-time';

import type { I18nLocales, ContentMeta } from '@/@types/contents';

import {
  threadsAPI,
  getThreads,
  targetTag,
  targetUsername
} from './api';

interface ThreadsFrontMatter {
  locale: I18nLocales;
  title: string;
  slug?: string;
  desc?: string;
  keywords?: string;
  tags?: string[];
  date?: string;
}

/**
 * @format posts on ThreadsApp
 * #{targetTag}
 *
 * ---
 * // required
 * locale: "en"
 * title: "My Title"
 *
 * // optional
 * slug: "my-title"
 * desc: "My Description"
 * keywords: "my post, my tag, may name"
 * tags: ["firstpost", "firstblog"]
 * ---
 */
async function getThreadsContents(locale?: I18nLocales) {
  const userID = await threadsAPI.getUserIDfromUsername(targetUsername);
  if (!userID) throw new Error('User not found');

  const userPosts = await threadsAPI.getUserProfileThreads(targetUsername, userID);

  const filteredPosts = userPosts.filter((_p) => {
    const threads = _p.thread_items;
    const header = threads[0];
    return header.post.caption?.text.includes(targetTag);
  });

  const blogPosts = filteredPosts.map(async(_post) => {
    const targetThread = _post.thread_items[0].post;
    const threads = await getThreads(targetThread.pk);

    const _header = targetThread.caption?.text ?? '';
    const header = _header?.replace(targetTag, '').trim();
    const frontMatter = matter(header);
    const meta = frontMatter.data as ThreadsFrontMatter;
    const tags = ['threadsapp'];
    const slug = meta.slug ?? meta.title.toLowerCase()
      .replace(/\s+/gi, '-')
      .replace(/[^a-z0-9_-]/g, '');

    // date can't work now
    // const date = dayjs(targetThread.taken_at).format('YYYY-MM-DD');
    const date = dayjs().format('YYYY-MM-DD');
    const metadata = {
      title: meta.title,
      slug: { [meta.locale]: slug } as any,
      slugOriginal: slug,
      description: meta.desc ?? `${targetUsername} blog on ThreadsApp`,
      keywords: meta.keywords ?? `${targetUsername}, threadsapp blog`,
      tags: [...tags, ...(meta.tags ?? [])],
      date: meta.date ?? date,
      readTime: readingTime(threads.join('\n\n')),
      image: '/media/banners/5.jpg'
    } satisfies ContentMeta;

    return {
      threads,
      locale: meta.locale,
      meta: metadata,
      contents: [
        (
          `---\ntitle: '${metadata.title}'\n` +
          `slug: {\n` +
          `\t${meta.locale}: '${metadata.slugOriginal}'\n` +
          `}\n` +
          `date: ${metadata.date}\n` +
          `description: '${metadata.description}'\n` +
          `keywords: '${metadata.keywords}'\n` +
          `tags: ${JSON.stringify(metadata.tags)}\n` +
          `image: '${metadata.image}'\n---`
        ),
        ...threads
      ].join('\n\n')
    };
  });

  const results = await Promise.all(blogPosts);
  if (locale) return results.filter((_t) => _t.locale === locale);
  return results;
}

async function main() {
  console.info(`> Generating contents from @${targetUsername} on ThreadsApp...`);
  const results = await getThreadsContents();
  await Promise.all(results.map((_post) => {
    return Fs.writeFile(`./contents/posts/${_post.locale}/${_post.meta.slugOriginal}.generated.mdx`, _post.contents);
  }));
  console.info(`> Contents has generated in 'contents/posts'!`);
}

main();
