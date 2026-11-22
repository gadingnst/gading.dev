import { generateDocsPathsDefault } from '@/modules/Docs/Docs.shared';
import withOverviewLocales from '@/modules/Docs/Overview/Overview.locales';
import OverviewPage from '@/modules/Docs/Overview/Overview.page';
import dt from '@/packages/libs/DayJS/dt';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = withOverviewLocales('en');
  return metadataBuilder({
    meta: {
      slug: '/docs',
      title: content.title,
      description: content.description,
      keywords: 'docs, stack, nextjs, mdx',
      image: '/media/default-banners/6.jpg',
      tags: ['docs', 'design system'],
      date: dt().format('YYYY-MM-DD')
    }
  });
});

export default OverviewPage;
