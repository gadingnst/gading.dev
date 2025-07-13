import { MetadataRoute } from 'next';

import { generateAboutPathsDefault, generateAboutPathsWithLang } from '@/modules/About/About.page';
import { generateBlogPathsDefault, generateBlogPathsWithLang } from '@/modules/Blog/BlogContent.page';
import { generateBlogPaginationPathsDefault, generateBlogPaginationPathsWithLang } from '@/modules/Blog/BlogListPagination.page';
import { generateHomePathsDefault, generateHomePathsWithLang } from '@/modules/Home/Home.page';
import { generateNowPathsDefault, generateNowPathsWithLang } from '@/modules/Now/Now.page';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://gading.dev';

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  const [
    homePaths,
    homePathsDefault,
    aboutPaths,
    aboutPathsDefault,
    nowPaths,
    nowPathsDefault,
    blogPaths,
    blogPathsDefault,
    blogPaginationPaths,
    blogPaginationPathsDefault
  ] = await Promise.all([
    generateHomePathsWithLang(),
    generateHomePathsDefault(),
    generateAboutPathsWithLang(),
    generateAboutPathsDefault(),
    generateNowPathsWithLang(),
    generateNowPathsDefault(),
    generateBlogPathsWithLang(),
    generateBlogPathsDefault(),
    generateBlogPaginationPathsWithLang(),
    generateBlogPaginationPathsDefault()
  ]);

  // Home
  homePathsDefault.forEach(() => {
    routes.push({
      url: BASE_URL,
      lastModified: new Date()
    });
  });
  homePaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}`,
      lastModified: new Date()
    });
  });

  // About
  aboutPathsDefault.forEach(() => {
    routes.push({
      url: `${BASE_URL}/about`,
      lastModified: new Date()
    });
  });
  aboutPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/about`,
      lastModified: new Date()
    });
  });

  // Now
  nowPathsDefault.forEach(() => {
    routes.push({
      url: `${BASE_URL}/now`,
      lastModified: new Date()
    });
  });
  nowPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/now`,
      lastModified: new Date()
    });
  });

  // Blog Pagination
  blogPaginationPathsDefault.forEach(path => {
    routes.push({
      url: `${BASE_URL}/blog/page/${path.page}`,
      lastModified: new Date()
    });
  });
  blogPaginationPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/blog/page/${path.page}`,
      lastModified: new Date()
    });
  });

  // Blog Posts
  blogPathsDefault.forEach(path => {
    routes.push({
      url: `${BASE_URL}/blog/${path.slug}`,
      lastModified: new Date()
    });
  });
  blogPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/blog/${path.slug}`,
      lastModified: new Date()
    });
  });

  return routes;
}

export default sitemap;
