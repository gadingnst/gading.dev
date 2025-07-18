import withColorsLocales from '@/modules/Docs/Colors/Colors.locales';
import ColorsPage, { generateDocsColorsDefault } from '@/modules/Docs/Colors/Colors.page';
import dt from '@/packages/libs/DayJS/dt';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsColorsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = withColorsLocales('en');
  return metadataBuilder({
    meta: {
      slug: '/docs/colors',
      title: content.title,
      description: content.description,
      keywords: 'color, system, design',
      image: '/media/default-banners/6.jpg',
      tags: ['daisyui', 'color', 'system'],
      date: dt().format('YYYY-MM-DD')
    }
  });
});

export default ColorsPage;
