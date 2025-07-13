import { generateStaticBlogPaths } from '@/modules/Blog/BlogContent.page';
import BlogContentDefaultPage from '@/modules/Blog/BlogContentDefault.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = async() => {
  const paths = await generateStaticBlogPaths();
  // Filter only English (default language) blog posts for routes without language prefix
  return paths.filter(path => path.lang === 'en').map(path => ({ slug: path.slug }));
};

export default BlogContentDefaultPage;