/**
 * check if url is valid
 * @param val - value to be checked
 * @returns {boolean} - true/false validation URL
 */
export const isURL = (val: string): boolean => {
  const expression = /^(http:\/\/|https:\/\/)(?=.*[a-z0-9])/i;
  return expression.test(val);
};

/**
 * Sanitize URL
 * @param url - url to be sanitize
 * @returns {string} - sanitized url
 */
export const sanitizeURL = (url: string): string => {
  const [scheme] = url.split('://');
  const result = url
    .replace(/(http:\/\/|https:\/\/)/, '')
    .replace(/\/+/g, '/')
    .replace(/\/+$/, '');
  return scheme.includes('http') ? `${scheme}://${result}` : result;
};

/**
 * Parse query string to object query
 * @param url - url to be parsed
 * @returns {Record<string, string>} - object parsed url
 */
export const parseQuery = (url: string): Record<string, string> => {
  const query = url.split('?')[1];
  return query ? query.split('&').reduce((acc, item) => {
    const [key, value] = item.split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>) : {};
};
