import withPortfolioLocales from '@/modules/Portfolio/Portfolio.locales';
import PortfolioPage, { generatePortfolioPathsDefault } from '@/modules/Portfolio/Portfolio.page';
import { withGenerateMetadata } from '@/packages/utils/metadata/metadata';
import { metadataBuilder } from '@/packages/utils/metadata/metadata.builder';

export const dynamic = 'force-static';

export const dynamicParams = false;

export const generateStaticParams = generatePortfolioPathsDefault;

export const generateMetadata = withGenerateMetadata(async() => {
  const content = withPortfolioLocales('en');
  return metadataBuilder({
    meta: {
      slug: '/portfolio',
      title: content.title,
      description: content.desc,
      keywords: 'gading portfolio, nouride, nouverse technologies, homelab, nouclip, swr-global-state',
      tags: ['portfolio', 'nouride', 'nouverse'],
      date: '2026-11-13'
    }
  });
});

export default PortfolioPage;
