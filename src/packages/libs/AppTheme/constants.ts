/* eslint-disable no-unused-vars */
export enum AppThemes {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark'
};

export type AppTheme = `${AppThemes}`;

export const APP_THEME_KEY = 'app_theme_state';
export const APP_THEME_IS_SYSTEM_DARK_KEY = 'app_theme_is_dark_state';
