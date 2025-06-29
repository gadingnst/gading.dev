/* eslint-disable no-unused-vars */
export enum AppThemes {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
};

export type AppTheme = `${AppThemes}`;

export const APP_THEME_KEY = 'app_theme_state';
export const APP_THEME_IS_SYSTEM_DARK = 'app_theme_is_dark_state';
