import { Eye, Monitor, Moon, Sun } from 'lucide-react';

import { AppThemes } from '@/packages/libs/AppTheme/constants';

/**
 * Get theme icon based on current theme
 * @param theme - Theme to get icon for
 * @returns Icon component
 */
export function getThemeIcon(theme: string) {
  switch (theme) {
    case AppThemes.LIGHT:
      return Sun;
    case AppThemes.LIGHT_COLORBLIND:
      return Eye;
    case AppThemes.DARK:
      return Moon;
    case AppThemes.DARK_COLORBLIND:
      return Eye;
    case AppThemes.SYSTEM:
      return Monitor;
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
    case AppThemes.LIGHT_COLORBLIND:
      return 'Light Colorblind';
    case AppThemes.DARK_COLORBLIND:
      return 'Dark Colorblind';
    case AppThemes.SYSTEM:
      return 'System';
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
