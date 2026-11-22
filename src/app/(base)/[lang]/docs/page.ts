import { generateDocsPathsWithLang } from '@/modules/Docs/Docs.shared';
import withOverviewLocales from '@/modules/Docs/Overview/Overview.locales';
import OverviewPage from '@/modules/Docs/Overview/Overview.page';
import dt from '@/packages/libs/DayJS/dt';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateDocsPathsWithLang;

export const generateMetadata = withGenerateMetadata<{ lang: I18nLocales }>(async({ params }) => {
  const { lang } = await params;
  const content = withOverviewLocales(lang);
  return metadataBuilder({
    locale: lang,
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
