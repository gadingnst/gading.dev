import BlogContentPage, { generateStaticBlogPaths } from '@/modules/Blog/BlogContent.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateStaticBlogPaths;

export default BlogContentPage;
