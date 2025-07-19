import { NextPageProps } from '@/@types/global';
import BlogPageList from '@/modules/Blog/components/PageList';
import { getBlogList } from '@/modules/Content/services/content-parser';
import { I18n } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';
import range from '@/packages/utils/helpers/range';

interface ParamsWithLang {
  lang: string;
  page: string;
}

interface ParamsWithoutLang {
  page: string;
}

export async function generateBlogPaginationPathsWithLang() {
  const _pathsRaw = await Promise.all(Object.keys(I18n)
    .map(async(lang) => {
      const { pagination } = await getBlogList(lang);
      return range(1, pagination.pageCount)
        .map(page => ({ page: `${page}`, lang }));
    }));
  const paths = _pathsRaw.flat(1);
  return paths;
};

export async function generateBlogPaginationPathsDefault() {
  const defaultLang = getDefaultLanguage();
  const { pagination } = await getBlogList(defaultLang);
  return range(1, pagination.pageCount)
    .map(page => ({ page: `${page}` }));
};

/**
 * Blog pagination page yang dapat menangani kedua kasus:
 * 1. Dengan parameter lang (untuk rute /[lang]/blog/page/[page])
 * 2. Tanpa parameter lang (untuk rute /blog/page/[page] - menggunakan bahasa default)
 */
async function BlogListPaginationPage({ params }: NextPageProps<ParamsWithLang|ParamsWithoutLang>) {
  const resolvedParams = await params;

  // Tentukan lang dan page berdasarkan parameter yang tersedia
  const lang = 'lang' in resolvedParams ? resolvedParams.lang : getDefaultLanguage();
  const page = resolvedParams.page;

  const pageNumber = Number(page);
  const pageCurrent = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  return <BlogPageList pageCurrent={pageCurrent} lang={lang} />;
}

export default BlogListPaginationPage;
