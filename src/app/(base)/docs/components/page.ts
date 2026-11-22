import withComponentsLocales from '@/modules/Docs/Components/Components.locales';
import ComponentsPage from '@/modules/Docs/Components/Components.page';
import { generateDocsPathsDefault } from '@/modules/Docs/Docs.shared';
import dt from '@/packages/libs/DayJS/dt';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = withComponentsLocales('en');
  return metadataBuilder({
    meta: {
      slug: '/docs/components',
      title: content.title,
      description: content.description,
      keywords: 'docs, components, ui',
      image: '/media/default-banners/6.jpg',
      tags: ['docs', 'design system'],
      date: dt().format('YYYY-MM-DD')
    }
  });
});

export default ComponentsPage;
