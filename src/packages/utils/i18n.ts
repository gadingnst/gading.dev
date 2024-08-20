import { NextPageProps } from '@/@types/global';
import { I18n, I18nLocales } from '@/@types/i18n';

export function getLocale(_params: NextPageProps['params']): I18nLocales {
  const { locale = 'en' } = _params;
  if (locale in I18n) {
    return locale as I18nLocales;
  }
  // eslint-disable-next-line no-console
  console.log('locale', locale);
  return 'en';
}
