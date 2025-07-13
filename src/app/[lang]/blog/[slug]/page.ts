import BlogContentPage, { generateBlogPathsWithLang } from '@/modules/Blog/BlogContent.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPathsWithLang;

export default BlogContentPage;
