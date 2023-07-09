import { getRequestConfig } from 'next-intl/server';

const i18nRequest = getRequestConfig(async({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));

export default i18nRequest;
