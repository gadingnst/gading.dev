import withPortfolioLocales from '@/modules/Portfolio/Portfolio.locales';
import PortfolioPage, { generatePortfolioPathsWithLang } from '@/modules/Portfolio/Portfolio.page';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generatePortfolioPathsWithLang;

export const generateMetadata = withGenerateMetadata<{ lang: I18nLocales }>(async({ params }) => {
  const { lang } = await params;
  const content = withPortfolioLocales(lang);
  return metadataBuilder({
    locale: lang,
    meta: {
      slug: '/portfolio',
      title: content.title,
      description: content.desc,
      keywords: 'gading portfolio, nouride, nouverse technologies, homelab',
      tags: ['portfolio', 'nouride', 'nouverse'],
      date: '2026-11-13'
    }
  });
});

export default PortfolioPage;
