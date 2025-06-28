import { I18n, I18nLocales } from './interface';

/**
 * Get default language (English)
 */
export const getDefaultLanguage = (): I18nLocales => 'en';

/**
 * Get all available languages
 */
export function getAvailableLanguages(): I18nLocales[] {
  return Object.keys(I18n) as I18nLocales[];
};

/**
 * Check if a language code is valid
 * @param lang - Language code to validate
 */
export function isValidLanguage(lang?: string|null): lang is I18nLocales {
  if (!lang) return false;
  return getAvailableLanguages().includes(lang as I18nLocales);
};

/**
 * Extract language from pathname
 * @param pathname - Current pathname
 * @returns Language code
 */
export function getLanguageFromPathname(pathname: string): I18nLocales {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  return firstSegment as I18nLocales;
};

/**
 * Get language from pathname with default value
 * @param pathname - Current pathname
 * @returns Language code with fallback langugage (en)
 */
export function getLangugageFromPathnameWithFallback(pathname: string): I18nLocales {
  const lang = getLanguageFromPathname(pathname);
  if (isValidLanguage(lang)) return lang;
  return getDefaultLanguage();
}

/**
 * Remove language prefix from pathname
 * @param pathname - Current pathname
 * @returns Pathname without language prefix
 */
export function removeLanguageFromPathname(pathname: string): string  {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (isValidLanguage(firstSegment)) {
    return '/' + segments.slice(1).join('/');
  }

  return pathname;
};

/**
 * Generate localized pathname
 * @param pathname - Base pathname
 * @param lang - Target language
 * @returns Localized pathname
 */
export function getLocalizedPathname(pathname: string, lang: I18nLocales): string {
  const cleanPathname = removeLanguageFromPathname(pathname);

  if (lang === getDefaultLanguage()) {
    return cleanPathname;
  }

  return `/${lang}${cleanPathname}`;
};

export function getLanguageLabel(lang: I18nLocales) {
  return lang.toUpperCase();
};

export function getLanguageFlag(lang: I18nLocales) {
  return lang === 'en' ? '🇺🇸' : '🇮🇩';
};
