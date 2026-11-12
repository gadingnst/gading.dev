import { AppTheme, AppThemes } from '@/packages/libs/AppTheme/constants';

export const DARK_THEMES = [
  AppThemes.DARK
];

export function isThemeDark(theme: AppTheme) {
  return DARK_THEMES.includes(theme as AppThemes);
}
