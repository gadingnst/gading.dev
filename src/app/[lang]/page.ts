import { notFound } from 'next/navigation';

import { AUTHOR_NAME } from '@/configs/author';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import HomePage, { generateHomePathsWithLang } from '@/modules/Home/Home.page';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { isValidLanguage } from '@/packages/libs/I18n/utils';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

interface LangPageProps {
  lang: I18nLocales;
}

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateHomePathsWithLang;

export const generateMetadata = withGenerateMetadata<LangPageProps>(async({ params }) => {
  const { lang } = params;
  if (!isValidLanguage(lang)) notFound();
  const { meta } = await getContentMultiLanguage('home', lang);
  return metadataBuilder({
    locale: lang,
    meta: {
      slug: '/',
      title: AUTHOR_NAME,
      description: meta.description,
      keywords: meta.keywords,
      tags: meta.tags,
      image: meta.image,
      date: meta.date
    }
  });
});

export default HomePage;
