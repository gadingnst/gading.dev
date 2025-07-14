import { NextPageProps } from '@/@types/global';
import BlogPageList from '@/modules/Blog/components/PageList';
import { I18n } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage } from '@/packages/libs/I18n/utils';

export async function generateBlogListPathsWithLang() {
  return Object.keys(I18n).map(lang => ({ lang }));
}

export async function generateBlogListPathsDefault() {
  return [{}];
}

async function BlogListPage(props: NextPageProps) {
  const params = await props.params;
  const lang = params.lang || getDefaultLanguage();
  return <BlogPageList pageCurrent={1} lang={lang} />;
}

export default BlogListPage;
