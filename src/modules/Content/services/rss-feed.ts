import { Feed } from 'feed';
import Fs from 'fs/promises';
import { marked } from 'marked';

import { AUTHOR_EMAIL, AUTHOR_FULLNAME, AUTHOR_INSTAGRAM, AUTHOR_NAME } from '@/configs/author';
import { BASE_URL, SITE_NAME } from '@/configs/sites';
import { getAllBlogMeta, getContent } from '@/modules/Content/services/content-parser';
import dt from '@/packages/libs/DayJS/dt';
import { I18n } from '@/packages/libs/I18n/interface';

/**
 * Generate RSS feed for blog posts
 * @returns {Promise<void>}
 */
async function generateRSSFeed(): Promise<void> {
  const blogList = await Promise.all(Object.keys(I18n).map(lang => getAllBlogMeta(lang)));
  const posts = blogList.flat(1).sort((a, b) => {
    const dateA = dt(a.meta.date);
    const dateB = dt(b.meta.date);
    return dateB.isBefore(dateA) ? -1 : 1;
  });
  const date = dt();
  const author = {
    name: AUTHOR_FULLNAME,
    email: AUTHOR_EMAIL,
    link: `http://threads.com/@${AUTHOR_INSTAGRAM}`
  };

  const feed = new Feed({
    title: SITE_NAME,
    description: 'The personal site of Gading Nasution.',
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

  const feedItems = await Promise.all(
    posts.map(async(post) => {
      const url = `${BASE_URL}/${post.locale}/blog/${post.meta.slugOriginal}`;
      const { source } = await getContent(post.meta.slugOriginal, post.locale);
      return {
        title: post.meta.title,
        id: url,
        link: url,
        description: post.meta.description,
        content: marked.parse(source),
        author: [author],
        contributor: [author],
        date: dt(post.meta.date).toDate()
      };
    })
  );

  feedItems.forEach((item) => {
    feed.addItem({
      ...item,
      content: item.content.toString()
    });
  });

  await Fs.mkdir('./public/rss', { recursive: true });
  await Promise.all([
    Fs.writeFile('./public/rss/feed.xml', feed.rss2()),
    Fs.writeFile('./public/rss/feed.json', feed.json1())
  ]);
}

export default generateRSSFeed;
