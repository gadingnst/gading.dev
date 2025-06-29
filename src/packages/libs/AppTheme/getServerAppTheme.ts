import { APP_THEME_KEY } from '@/packages/libs/AppTheme/constants';
import { cookies } from 'next/headers';

async function getServerAppTheme() {
  const cookiesList = await cookies();
  const appTheme = cookiesList.get(APP_THEME_KEY);
  const appThemeValue = appTheme?.value.replace(/\"/gi, '');
  return appThemeValue;
}

export default getServerAppTheme;
