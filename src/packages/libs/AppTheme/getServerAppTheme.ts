import Cookies from 'next-cookies-universal';

import { APP_THEME_KEY } from '@/packages/libs/AppTheme/constants';

async function getServerAppTheme() {
  const cookies = Cookies('server');
  const appTheme = await cookies.get(APP_THEME_KEY);
  return appTheme;
}

export default getServerAppTheme;
