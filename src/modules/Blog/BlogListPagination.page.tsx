import { NextPageProps } from '@/@types/global';
import BlogList from '@/modules/Blog/components/List';

interface Params {
  page: string;
}

async function BlogListPaginationPage({ params }: NextPageProps<Params>) {
  const { page } = await params;

  const pageNumber = Number(page);
  const pageCurrent = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  return <BlogList pageCurrent={pageCurrent} />;
}

export default BlogListPaginationPage;
