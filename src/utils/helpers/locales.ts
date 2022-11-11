import { I18n, I18nLocales } from '@/types/contents';

type I18nLocalesToContent<K extends string> = {
  [locale in I18nLocales]: Record<K, string>
};

type ObjectContents = {
  [locale in I18nLocales]: string
};

type I18nContentToLocales<K extends string> = Record<K, ObjectContents>;

type CreateContentLocales<K extends string> =
  <T = I18nLocales>(locale: T) => Record<K, string>;

/**
 * convert passed (contents->locales based) to (locales->contents based)
 * @param data (content->locales based) data
 */
export function generateLocaleBasedContents<T extends string>(data: I18nContentToLocales<T>): I18nLocalesToContent<T> {
  const classificationLocales: I18nLocalesToContent<T> = Object.entries<ObjectContents>(data)
    .reduce((accumulator, [key, contentLocales]) => {
      Object.keys(I18n).forEach((lcl) => {
        const locale = lcl as I18nLocales;
        const content = contentLocales[locale];
        if (accumulator?.[locale]) {
          accumulator[locale][key as T] = content;
        } else {
          accumulator[locale] = { [key]: content } as Record<T, string>;
        }
      });
      return accumulator;
    }, {} as I18nLocalesToContent<T>);
  return classificationLocales;
}

/**
 * curry `generateLocaleBasedContents` with another function
 * @param data (content->locales based) data
 */
function createContentLocales<T extends string>(data: I18nContentToLocales<T>): CreateContentLocales<keyof typeof data> {
  const locales = generateLocaleBasedContents(data);
  return <K = I18nLocales>(locale: K) => locales[locale as I18nLocales];
}

export default createContentLocales;
