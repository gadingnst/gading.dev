import BlogListPaginationPage, { generateBlogPaginationPathsDefault } from '@/modules/Blog/BlogListPagination.page';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPaginationPathsDefault;

export default BlogListPaginationPage;
