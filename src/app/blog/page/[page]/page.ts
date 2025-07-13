import BlogListPaginationPage, { generateBlogPaginationPaths } from '@/modules/Blog/BlogListPagination.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPaginationPaths;

export default BlogListPaginationPage;
