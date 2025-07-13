import BlogListPaginationPage, { generateBlogPaginationPathsWithLang } from '@/modules/Blog/BlogListPagination.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPaginationPathsWithLang;

export default BlogListPaginationPage;
