import { CookiesServer } from 'next-cookies-universal';

import { APP_THEME_KEY } from '@/packages/libs/AppTheme/constants';

async function getServerAppTheme() {
  const cookies = await CookiesServer();
  const appTheme = cookies.get(APP_THEME_KEY);
  return appTheme;
}

export default getServerAppTheme;
