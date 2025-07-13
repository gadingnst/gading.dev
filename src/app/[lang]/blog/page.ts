import withBlogListLocales from '@/modules/Blog/BlogList.locales';
import BlogListPage, { generateBlogListPathsWithLang } from '@/modules/Blog/BlogList.page';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogListPathsWithLang;

export const generateMetadata = withGenerateMetadata<{ lang: I18nLocales }>(async({ params }) => {
  const { lang } = await params;
  const content = withBlogListLocales(lang);
  return metadataBuilder({
    locale: lang,
    meta: {
      slug: '/blog',
      title: 'Blog',
      description: content.desc,
      keywords: 'gadings writing, technical writing, blog gading, gading blog',
      tags: ['blog', 'writing', 'technical writing', 'gadings'],
      image: '/media/default-banners/5.jpg',
      date: '2022-06-01'
    }
  });
});

export default BlogListPage;
