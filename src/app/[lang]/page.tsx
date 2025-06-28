import { isValidLanguage } from '@/packages/libs/I18n/utils';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import HomePage from '@/modules/Home/Home.page';
import homePageLocales from '@/modules/Home/locales';
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
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.'
    };
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

export default HomePage;
