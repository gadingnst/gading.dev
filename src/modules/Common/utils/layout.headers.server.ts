import { headers } from 'next/headers';
import {
  HEADERS_REQUEST_DOMAIN_KEY,
  HEADERS_REQUEST_PATHNAME_KEY,
  HEADERS_REQUEST_SEARCH_KEY,
  HEADERS_REQUEST_URL_KEY
} from '@/configs/headers';
import { getLanguageFromPathnameStrict, getDefaultLanguage } from '@/packages/libs/I18n/utils';
import { I18nLocales } from '@/packages/libs/I18n/interface';

export async function getRequestDomain() {
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_DOMAIN_KEY);
}

export async function getRequestUrl() {
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_URL_KEY);
}

export async function getRequestPathname() {
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_PATHNAME_KEY);
}

export async function getRequestSearch() {
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_SEARCH_KEY);
}

export async function getRequestLanguage(): Promise<I18nLocales> {
  const headerList = await headers();
  const pathname = headerList.get(HEADERS_REQUEST_PATHNAME_KEY) || '/';

  // Try to get language from pathname strictly (without fallback)
  const langFromPath = getLanguageFromPathnameStrict(pathname);
  if (langFromPath) return langFromPath;

  // For root path, use default language
  return getDefaultLanguage();
}
