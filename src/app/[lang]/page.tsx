import { notFound } from 'next/navigation';

import withHomeLocales from '@/modules/Home/Home.locales';
import HomePage, { generateHomePathsWithLang } from '@/modules/Home/Home.page';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { isValidLanguage } from '@/packages/libs/I18n/utils';
import { withGenerateMetadata } from '@/packages/utils/metadata';

interface LangPageProps {
  lang: string;
}

export const generateStaticParams = generateHomePathsWithLang;

export const generateMetadata = withGenerateMetadata<LangPageProps>(async({ params }) => {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const currentLang = lang as I18nLocales;
  const content = withHomeLocales(currentLang);

  return {
    title: content.title,
    description: content.description,
    openGraph: {
      title: content.title,
      description: content.description,
      locale: lang === 'id' ? 'id_ID' : 'en_US'
    }
  };
});

async function LangPage({ params }: { params: Promise<LangPageProps> }) {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  return <HomePage params={{ lang }} />;
}

export default LangPage;
