import AboutPage, { generateAboutPathsDefault } from '@/modules/About/About.page';
import { getContentMultiLanguage } from '@/modules/ContentParser/services/content-parser';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateAboutPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = await getContentMultiLanguage('about', 'en');
  return metadataBuilder({
    locale: 'en',
    meta: {
      slug: '/about',
      title: content.meta.title,
      description: content.meta.description,
      keywords: content.meta.keywords,
      image: content.meta.image
    }
  });
});

export default AboutPage;
