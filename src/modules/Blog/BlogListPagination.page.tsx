import { NextPageProps } from '@/@types/global';
import BlogList from '@/modules/Blog/components/List';
import { getBlogList } from '@/modules/ContentParser/services/content-parser';
import { I18n } from '@/packages/libs/I18n/interface';
import range from '@/packages/utils/helpers/range';

interface Params {
  lang: string;
  page: string;
}

export async function generateBlogPaginationPaths() {
  const _pathsRaw = await Promise.all(Object.keys(I18n)
    .map(async(locale) => {
      const { pagination } = await getBlogList(locale);
      return range(1, Math.ceil(pagination.total / pagination.limit))
        .map(page => ({ page: `${page}`, lang: locale }));
    }));
  const paths = _pathsRaw.flat(1);
  return paths;
};

async function BlogListPaginationPage({ params }: NextPageProps<Params>) {
  const { page, lang } = await params;

  const pageNumber = Number(page);
  const pageCurrent = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  return <BlogList pageCurrent={pageCurrent} lang={lang} />;
}

export default BlogListPaginationPage;
