import { getBlogList } from '@/modules/Content/services/content-parser';
import NotFoundView, { type NotFoundPost } from '@/modules/NotFound/NotFoundView';
import { I18n } from '@/packages/libs/I18n/interface';

const LATEST_POSTS_LIMIT = 3;

async function getLatestPosts(language: string): Promise<NotFoundPost[]> {
  const { contents } = await getBlogList(language, { limit: LATEST_POSTS_LIMIT });
  return contents.map(({ title, slugOriginal, date, readTime }) => ({
    title,
    slug: slugOriginal,
    date,
    readTime: readTime.text
  }));
}

/**
 * One not-found page for every invalid route (root, /en and /id).
 * The static export only renders the root not-found, so the latest posts of
 * every language are read at build time and the view picks the current one.
 */
async function NotFoundPage() {
  const languages = Object.keys(I18n);
  const entries = await Promise.all(languages.map(async(language) => (
    [language, await getLatestPosts(language)] as const
  )));
  return <NotFoundView postsByLanguage={Object.fromEntries(entries)} />;
}

export default NotFoundPage;
