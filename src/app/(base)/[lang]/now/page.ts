import { getContentMultiLanguage } from '@/modules/Content/services/content-parser';
import NowPage, { generateNowPathsWithLang } from '@/modules/Now/Now.page';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateNowPathsWithLang;

export const generateMetadata = withGenerateMetadata<{ lang: I18nLocales }>(async({ params }) => {
  const { lang } = await params;
  const content = await getContentMultiLanguage('now', lang);
  return metadataBuilder({
    locale: lang,
    meta: {
      slug: '/now',
      title: content.meta.title,
      description: content.meta.description,
      keywords: content.meta.keywords,
      image: content.meta.image,
      tags: content.meta.tags,
      date: content.meta.date
    }
  });
});

export default NowPage;
