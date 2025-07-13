import { MetadataRoute } from 'next';

import { generateAboutPathsDefault, generateAboutPathsWithLang } from '@/modules/About/About.page';
import { generateBlogPathsDefault, generateBlogPathsWithLang } from '@/modules/Blog/BlogContent.page';
import { generateBlogPaginationPathsDefault, generateBlogPaginationPathsWithLang } from '@/modules/Blog/BlogListPagination.page';
import { generateHomePathsDefault, generateHomePathsWithLang } from '@/modules/Home/Home.page';
import { generateNowPathsDefault, generateNowPathsWithLang } from '@/modules/Now/Now.page';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://gading.dev';

async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // Home
  const homePaths = await generateHomePathsWithLang();
  homePaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}`,
      lastModified: new Date()
    });
  });
  const homePathsDefault = await generateHomePathsDefault();
  homePathsDefault.forEach(() => {
    routes.push({
      url: BASE_URL,
      lastModified: new Date()
    });
  });

  // About
  const aboutPaths = await generateAboutPathsWithLang();
  aboutPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/about`,
      lastModified: new Date()
    });
  });
  const aboutPathsDefault = await generateAboutPathsDefault();
  aboutPathsDefault.forEach(() => {
    routes.push({
      url: `${BASE_URL}/about`,
      lastModified: new Date()
    });
  });

  // Now
  const nowPaths = await generateNowPathsWithLang();
  nowPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/now`,
      lastModified: new Date()
    });
  });
  const nowPathsDefault = await generateNowPathsDefault();
  nowPathsDefault.forEach(() => {
    routes.push({
      url: `${BASE_URL}/now`,
      lastModified: new Date()
    });
  });

  // Blog Posts
  const blogPaths = await generateBlogPathsWithLang();
  blogPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/blog/${path.slug}`,
      lastModified: new Date()
    });
  });
  const blogPathsDefault = await generateBlogPathsDefault();
  blogPathsDefault.forEach(path => {
    routes.push({
      url: `${BASE_URL}/blog/${path.slug}`,
      lastModified: new Date()
    });
  });

  // Blog Pagination
  const blogPaginationPaths = await generateBlogPaginationPathsWithLang();
  blogPaginationPaths.forEach(path => {
    routes.push({
      url: `${BASE_URL}/${path.lang}/blog/page/${path.page}`,
      lastModified: new Date()
    });
  });
  const blogPaginationPathsDefault = await generateBlogPaginationPathsDefault();
  blogPaginationPathsDefault.forEach(path => {
    routes.push({
      url: `${BASE_URL}/blog/page/${path.page}`,
      lastModified: new Date()
    });
  });

  return routes;
}

export default sitemap;
