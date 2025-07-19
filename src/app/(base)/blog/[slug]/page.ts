import BlogContentPage, { generateBlogPathsDefault } from '@/modules/Blog/BlogContent.page';
import { getContent } from '@/modules/Content/services/content-parser';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPathsDefault;

export const generateMetadata = withGenerateMetadata<{ slug: string; }>(async({ params }) => {
  const { slug } = await params;
  const content = await getContent(slug, 'en');
  return metadataBuilder({
    meta: {
      ...content.meta,
      slug: `/blog/${content.meta.slugOriginal}`
    }
  });
});

export default BlogContentPage;
