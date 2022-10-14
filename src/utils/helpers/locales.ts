import { I18n, I18nLocales } from '@/types/contents';

type ObjectContents = {
  [locale in I18nLocales]: string
};

type I18nLocalesToContent = {
  [locale in I18nLocales]: Record<string, string>
};

type I18nContentToLocales<K extends string> = Record<K, ObjectContents>;

/**
 * convert passed (contents->locales based) to (locales->contents based)
 * @param data (content->locales based) data
 */
function generateLocaleBasedContents<T extends string>(data: I18nContentToLocales<T>): I18nLocalesToContent {
  const classificationLocales: I18nLocalesToContent = Object.entries(data)
    .reduce((accumulator, [key, contentLocales]) => {
      Object.keys(I18n).forEach((lcl) => {
        const locale = lcl as I18nLocales;
        const content = (contentLocales as ObjectContents)[locale];
        if (accumulator?.[locale]) {
          accumulator[locale][key] = content;
        } else {
          accumulator[locale] = { [key]: content };
        }
      });
      return accumulator;
    }, {} as I18nLocalesToContent);
  return classificationLocales;
}

/**
 * curry `generateLocaleBasedContents` with another function
 * @param data (content->locales based) data
 */
function createContentLocales<T extends string>(data: I18nContentToLocales<T>):
  (locale: I18nContentToLocales<T>|string) => Record<keyof typeof data, string> {
  const locales = generateLocaleBasedContents(data);
  return (locale: I18nContentToLocales<T>|string) => locales[locale as I18nLocales];
}

export default createContentLocales;
