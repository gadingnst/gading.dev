import { I18n, I18nLocales } from '@/types/contents';

type LocalesToContent = {
  [locale in I18nLocales]: Record<string, string>
};

type ContentToLocales = {
  en: string;
  id: string;
};

type I18nContentLocales<K extends string> = Record<K, ContentToLocales>;

/**
 * convert passed (contents -> locales) based to (locales -> contents based)
 * @param data (content -> locales) data
 */
function createContentLocales<T extends string>(data: I18nContentLocales<T>): (locale: I18nContentLocales<T>|string) => Record<keyof typeof data, string> {
  const classificationLocales: LocalesToContent = Object.entries(data)
    .reduce((acc, [key, contentLocales]) => {
      Object.keys(I18n).forEach((locale) => {
        const content = (contentLocales as ContentToLocales)[locale as I18nLocales];
        acc[locale as I18nLocales][key] = content;
      });
      return acc;
    }, { en: {}, id: {} } as LocalesToContent);
  return (locale: I18nContentLocales<T>|string) => (
    classificationLocales[locale as I18nLocales]
  );
}

export default createContentLocales;
