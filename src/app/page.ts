import { AUTHOR_NAME } from '@/configs/author';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import HomePage, { generateHomePathsDefault } from '@/modules/Home/Home.page';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateHomePathsDefault;

export const metadata = withGenerateMetadata(async() => {
  const { meta } = await getContentMultiLanguage('home', 'en');
  return metadataBuilder({
    meta: {
      title: AUTHOR_NAME,
      description: meta.description,
      slug: '/',
      date: meta.date,
      keywords: meta.keywords,
      tags: meta.tags
    }
  });
});

export default HomePage;
