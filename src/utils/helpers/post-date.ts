import day from '@/utils/day';

/**
 *
 * @param date - date to be formatted
 * @returns {string} - formatted date
 */
function postDate(date: string, locale = 'en'): string {
  return day(date).locale(locale).format('MMMM DD, YYYY');
}

export default postDate;
