import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import NowPage, { generateNowPathsDefault } from '@/modules/Now/Now.page';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateNowPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = await getContentMultiLanguage('now', 'en');
  return metadataBuilder({
    locale: 'en',
    meta: {
      slug: '/now',
      title: content.meta.title,
      description: content.meta.description,
      keywords: content.meta.keywords,
      image: content.meta.image
    }
  });
});

export default NowPage;
