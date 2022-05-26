/**
 *
 * @param val - value to be checked
 * @returns {boolean} - true/false validation URL
 */
export const isURL = (val: string): boolean => {
  const expression = /^(http:\/\/|https:\/\/)(?=.*[a-z0-9])/i;
  return expression.test(val);
};

/**
 *
 * @param url - url to be parsed
 * @returns {Record<string, string>} - object parsed url
 */
export const parseQuery = (url: string): Record<string, string> => {
  const query = url.split('?')[1];
  return query ? query.split('&').reduce((acc, item) => {
    const [key, value] = item.split('=');
    acc[key] = value;
    return acc;
  }, {} as any) : {};
};
