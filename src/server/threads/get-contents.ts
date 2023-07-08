/* eslint-disable no-console */
import matter from 'gray-matter';
import {
  threadsAPI,
  getThreads,
  getContentImages,
  targetTag,
  targetUsername
} from './api';
import { ContentMeta } from '@/server/content-parser';
import dayjs from 'dayjs';
import readingTime from 'reading-time';
import { I18nLocales } from '@/types/contents';

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
async function main() {
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

    const [image] = getContentImages(targetThread.image_versions2, targetThread.carousel_media);

    return {
      header,
      threads,
      locale: meta.locale,
      full: [header, ...threads],
      meta: {
        title: meta.title,
        slug: { [meta.locale]: slug } as any,
        slugOriginal: slug,
        description: meta.desc ?? `${targetUsername} blog on ThreadsApp`,
        keywords: meta.keywords ?? `${targetUsername}, threadsapp blog`,
        tags: [...tags, ...(meta.tags ?? [])],
        date: meta.date ?? dayjs(targetThread.taken_at).format('YYYY-MM-DD'),
        readTime: readingTime(threads.join('\n\n')),
        image: image ?? '/media/banners/5.jpg'
      } satisfies ContentMeta
    };
  });

  await Promise.all(blogPosts.map(async(_p) => {
    const { threads, meta } = await _p;
    console.log(meta);
    console.log(threads);
  }));

}

main();
