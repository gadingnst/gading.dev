import BlogContentPage, { generateBlogPathsDefault } from '@/modules/Blog/BlogContent.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPathsDefault;

export default BlogContentPage;
