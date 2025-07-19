import BlogContentPage, { generateBlogPathsWithLang } from '@/modules/Blog/BlogContent.page';
import { getContent } from '@/modules/Content/services/content-parser';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generateBlogPathsWithLang;

export const generateMetadata = withGenerateMetadata<{ slug: string; lang: I18nLocales; }>(async({ params }) => {
  const { lang, slug } = await params;
  const content = await getContent(slug, lang);
  return metadataBuilder({
    locale: lang,
    meta: {
      ...content.meta,
      slug: `/blog/${content.meta.slugOriginal}`
    }
  });
});

export default BlogContentPage;
