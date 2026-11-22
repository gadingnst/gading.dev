import withContentPipelineLocales from '@/modules/Docs/ContentPipeline/ContentPipeline.locales';
import ContentPipelinePage from '@/modules/Docs/ContentPipeline/ContentPipeline.page';
import { generateDocsPathsWithLang } from '@/modules/Docs/Docs.shared';
import dt from '@/packages/libs/DayJS/dt';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsPathsWithLang;

export const generateMetadata = withGenerateMetadata<{ lang: I18nLocales }>(async({ params }) => {
  const { lang } = await params;
  const content = withContentPipelineLocales(lang);
  return metadataBuilder({
    locale: lang,
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
