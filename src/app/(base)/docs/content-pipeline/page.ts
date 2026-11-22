import withContentPipelineLocales from '@/modules/Docs/ContentPipeline/ContentPipeline.locales';
import ContentPipelinePage from '@/modules/Docs/ContentPipeline/ContentPipeline.page';
import { generateDocsPathsDefault } from '@/modules/Docs/Docs.shared';
import dt from '@/packages/libs/DayJS/dt';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = withContentPipelineLocales('en');
  return metadataBuilder({
    meta: {
      slug: '/docs/content-pipeline',
      title: content.title,
      description: content.description,
      keywords: 'docs, blog, mdx, og image, sitemap, github actions',
      image: '/media/default-banners/6.jpg',
      tags: ['docs', 'design system'],
      date: dt().format('YYYY-MM-DD')
    }
  });
});

export default ContentPipelinePage;
