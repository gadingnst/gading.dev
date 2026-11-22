import { generateDocsPathsDefault } from '@/modules/Docs/Docs.shared';
import withTypographyLocales from '@/modules/Docs/Typography/Typography.locales';
import TypographyPage from '@/modules/Docs/Typography/Typography.page';
import dt from '@/packages/libs/DayJS/dt';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = withTypographyLocales('en');
  return metadataBuilder({
    meta: {
      slug: '/docs/typography',
      title: content.title,
      description: content.description,
      keywords: 'docs, typography, fonts',
      image: '/media/default-banners/6.jpg',
      tags: ['docs', 'design system'],
      date: dt().format('YYYY-MM-DD')
    }
  });
});

export default TypographyPage;
