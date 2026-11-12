/* eslint-disable no-unused-vars */
export enum AppThemes {
  SYSTEM = 'system',
  LIGHT = 'light',
  DARK = 'dark'
};

export type AppTheme = `${AppThemes}`;

export const APP_THEME_KEY = 'app_theme_state';
export const APP_THEME_IS_SYSTEM_DARK_KEY = 'app_theme_is_dark_state';

/**
 * daisyUI theme names are `gading-light` / `gading-dark`; the persisted value
 * (cookie) stays the short `light` / `dark` / `system`.
 */
export const APP_THEME_ATTRIBUTE_PREFIX = 'gading-';

export const APP_THEME_SELECTION_ENABLED = true;
/** `system` follows the OS until the visitor picks one with the toggle */
export const APP_THEME_DEFAULT = AppThemes.SYSTEM;
