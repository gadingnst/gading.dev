import { headers } from 'next/headers';
import {
  HEADERS_REQUEST_DOMAIN_KEY,
  HEADERS_REQUEST_LANGUAGE_KEY,
  HEADERS_REQUEST_PATHNAME_KEY,
  HEADERS_REQUEST_SEARCH_KEY,
  HEADERS_REQUEST_URL_KEY
} from '@/configs/headers';

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

export async function getRequestLanguage() {
  const headerList = await headers();
  return headerList.get(HEADERS_REQUEST_LANGUAGE_KEY);
}
