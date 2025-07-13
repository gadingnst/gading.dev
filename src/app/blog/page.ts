import withBlogListLocales from '@/modules/Blog/BlogList.locales';
import BlogListPage, { generateBlogListPathsDefault } from '@/modules/Blog/BlogList.page';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogListPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = withBlogListLocales('en');
  return metadataBuilder({
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
