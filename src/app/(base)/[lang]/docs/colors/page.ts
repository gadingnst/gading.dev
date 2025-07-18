import withColorsLocales from '@/modules/Docs/Colors/Colors.locales';
import ColorsPage, { generateDocsColorsWithLang } from '@/modules/Docs/Colors/Colors.page';
import dt from '@/packages/libs/DayJS/dt';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsColorsWithLang;

export const generateMetadata = withGenerateMetadata<{ lang: I18nLocales }>(async({ params }) => {
  const { lang } = await params;
  const content = withColorsLocales(lang);
  return metadataBuilder({
    locale: lang,
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
