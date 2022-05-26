import day from '@/utils/day';
import { DEFAULT_LOCALE } from '../config';

export interface FormatDate {
  [key: string]: string;
}

/**
 *
 * @param locale - locale to be used
 * @returns {string} - formatted date
 */
const getFormat = (locale: string): string => {
  const format: FormatDate = {
    en: 'MMMM DD, YYYY',
    id: 'DD MMMM YYYY'
  };
  return format[locale] || format.en;
};

/**
 * format for post date
 * @param date - date to be formatted
 * @returns {string} - formatted date
 */
function date(date: string, locale = DEFAULT_LOCALE, format?: string): string {
  return day(date)
    .locale(locale)
    .format(format ?? getFormat(locale));
}

export default date;
