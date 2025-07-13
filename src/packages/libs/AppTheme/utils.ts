import { Monitor, Moon, Sun } from 'lucide-react';

import { AppTheme, AppThemes } from '@/packages/libs/AppTheme/constants';

export const DARK_THEMES = [
  AppThemes.DARK
];

export function isThemeDark(theme: AppTheme) {
  return DARK_THEMES.includes(theme as AppThemes);
}

/**
 * Get theme icon based on current theme
 * @param theme - Theme to get icon for
 * @returns Icon component
 */
export function getThemeIcon(theme: string) {
  switch (theme) {
    case AppThemes.LIGHT:
      return Sun;
    case AppThemes.DARK:
      return Moon;
    default:
      return Monitor;
  }
};

/**
 * Get theme label for display
 * @param theme - Theme to get label for
 * @returns Theme label
 */
export function getThemeLabel(theme: string) {
  switch (theme) {
    case AppThemes.LIGHT:
      return 'Light';
    case AppThemes.DARK:
      return 'Dark';
    default:
      return 'System';
  }
};

/**
 * Generate theme options dynamically from AppThemes enum
 * @returns Array of theme options with value, label, and icon
 */
export const themeOptions = Object.values(AppThemes).map(theme => ({
  value: theme,
  label: getThemeLabel(theme),
  icon: getThemeIcon(theme)
}));
