import { headers } from 'next/headers';

import { IS_STATIC } from '@/configs/envs';
import {
  HEADERS_REQUEST_DOMAIN_KEY,
  HEADERS_REQUEST_PATHNAME_KEY,
  HEADERS_REQUEST_SEARCH_KEY,
  HEADERS_REQUEST_URL_KEY
} from '@/configs/headers';
import { I18nLocales } from '@/packages/libs/I18n/interface';
import { getDefaultLanguage, getLanguageFromPathnameStrict } from '@/packages/libs/I18n/utils';

export async function getRequestDomain() {
  if (IS_STATIC) return null;
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_DOMAIN_KEY);
}

export async function getRequestUrl() {
  if (IS_STATIC) return null;
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_URL_KEY);
}

export async function getRequestPathname() {
  if (IS_STATIC) return null;
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_PATHNAME_KEY);
}

export async function getRequestSearch() {
  if (IS_STATIC) return null;
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_SEARCH_KEY);
}

export async function getRequestLanguage(): Promise<I18nLocales> {
  if (IS_STATIC) return getDefaultLanguage();
  const headerList = await headers();
  const pathname = headerList.get(HEADERS_REQUEST_PATHNAME_KEY) || '/';

  // Try to get language from pathname strictly (without fallback)
  const langFromPath = getLanguageFromPathnameStrict(pathname);
  if (langFromPath) return langFromPath;

  // For root path, use default language
  return getDefaultLanguage();
}
