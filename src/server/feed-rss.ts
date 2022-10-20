import Fs from 'fs/promises';
import { Feed } from 'feed';
import { I18n } from '@/types/contents';
import { getAllBlogMeta } from '@/server/content-parser';
import {
  BASE_URL,
  AUTHOR_FULLNAME,
  AUTHOR_EMAIL,
  AUTHOR_INSTAGRAM,
  SITE_NAME,
  AUTHOR_NAME
} from '@/utils/config';
import day from '@/utils/day';

/**
 * Generate RSS feed for blog posts
 * @returns {Promise<void>}
 */
async function generateRSSFeed(): Promise<void> {
  const blogList = await Promise.all(Object.keys(I18n).map(lang => getAllBlogMeta(lang)));
  const posts = blogList.flat(1).sort((a, b) => {
    const dateA = day(a.meta.date);
    const dateB = day(b.meta.date);
    return dateB.isBefore(dateA) ? -1 : 1;
  });
  const date = day();
  const author = {
    name: AUTHOR_FULLNAME,
    email: AUTHOR_EMAIL,
    link: `https://instagram.com/${AUTHOR_INSTAGRAM}`
  };

  const feed = new Feed({
    title: SITE_NAME,
    description: 'The personal blog of Gading Nasution.',
    id: BASE_URL,
    link: BASE_URL,
    image: `${BASE_URL}/favicon.ico`,
    favicon: `${BASE_URL}/favicon.ico`,
    copyright: `All rights reserved ${date.year()}, ${AUTHOR_FULLNAME}`,
    updated: date.toDate(),
    generator: AUTHOR_NAME,
    feedLinks: {
      rss2: `${BASE_URL}/rss/feed.xml`,
      json: `${BASE_URL}/rss/feed.json`
    },
    author
  });

  posts.forEach((post) => {
    const url = `${BASE_URL}/${post.locale}/${post.meta.slugOriginal}`;
    feed.addItem({
      title: post.meta.title,
      id: url,
      link: url,
      description: post.meta.description,
      // content: post.meta.description,
      author: [author],
      contributor: [author],
      date: day(post.meta.date).toDate()
    });
  });

  await Fs.mkdir('./public/rss', { recursive: true });
  await Promise.all([
    Fs.writeFile('./public/rss/feed.xml', feed.rss2()),
    Fs.writeFile('./public/rss/feed.json', feed.json1())
  ]);
}

export default generateRSSFeed;
