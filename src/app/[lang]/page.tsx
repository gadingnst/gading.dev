import { notFound } from 'next/navigation';

import HomePage from '@/modules/Home/Home.page';
import homePageLocales from '@/modules/Home/locales';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { isValidLanguage } from '@/packages/libs/I18n/utils';
import { withGenerateMetadata } from '@/packages/utils/metadata';

interface LangPageProps {
  lang: string;
}

export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'id' }
  ];
}

export const generateMetadata = withGenerateMetadata<LangPageProps>(async({ params }) => {
  const { lang } = await params;

  if (!isValidLanguage(lang)) {
    notFound();
  }

  const currentLang = lang as I18nLocales;
  const content = homePageLocales(currentLang);

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

  return <HomePage />;
}

export default LangPage;
