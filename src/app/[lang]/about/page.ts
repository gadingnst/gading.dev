import AboutPage, { generateAboutPathsWithLang } from '@/modules/About/About.page';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateAboutPathsWithLang;

export const generateMetadata = withGenerateMetadata<{ lang: I18nLocales; }>(async({ params }) => {
  const { lang } = params;
  const content = await getContentMultiLanguage('about', lang);
  return metadataBuilder({
    locale: lang,
    meta: {
      slug: '/about',
      title: content.meta.title,
      description: content.meta.description,
      keywords: content.meta.keywords,
      image: content.meta.image,
      tags: content.meta.tags,
      date: content.meta.date
    }
  });
});

export default AboutPage;
