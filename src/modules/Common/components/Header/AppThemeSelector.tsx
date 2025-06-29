'use client';

import { useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { AppThemes } from '@/packages/libs/AppTheme/constants';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';
import Dropdown from '@/packages/components/base/Floatings';
import cn from '@/designs/utils/cn';
import { useRouter } from 'next/navigation';

interface AppThemeSelectorProps {
  isScrolled?: boolean;
}

/**
 * Theme selector dropdown component using DaisyUI 5
 * Handles theme switching between light, dark, and system
 */
export default function AppThemeSelector({ isScrolled = false }: AppThemeSelectorProps) {
  const router = useRouter();
  const { appTheme, setTheme, isSystemDark } = useAppTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /**
   * Get theme icon based on current theme
   * @param theme - Theme to get icon for
   * @returns Icon component
   */
  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case AppThemes.LIGHT:
        return Sun;
      case AppThemes.DARK:
        return Moon;
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
  const getThemeLabel = (theme: string) => {
    switch (theme) {
      case AppThemes.LIGHT:
        return 'Light';
      case AppThemes.DARK:
        return 'Dark';
      case AppThemes.SYSTEM:
        return 'System';
      default:
        return 'System';
    }
  };

  /**
   * Handle theme change from dropdown
   * @param newTheme - Selected theme
   */
  const handleThemeChange = (newTheme: string) => {
    if (newTheme === appTheme) {
      setIsDropdownOpen(false);
      return;
    }

    setTheme(newTheme as AppThemes);
    setIsDropdownOpen(false);
    router.refresh();
  };

  const themeOptions = [
    { value: AppThemes.LIGHT, label: 'Light', icon: Sun },
    { value: AppThemes.DARK, label: 'Dark', icon: Moon },
    { value: AppThemes.SYSTEM, label: 'System', icon: Monitor }
  ];

  const CurrentIcon = getThemeIcon(appTheme);

  return (
    <Dropdown
      isScrolled={isScrolled}
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
      trigger={
        <>
          <CurrentIcon className="w-4 h-4" />
          <span className="hidden sm:inline">{getThemeLabel(appTheme)}</span>
        </>
      }
    >
      {themeOptions.map((option) => {
        const isActive = option.value === appTheme;
        const IconComponent = option.icon;

        return (
          <li key={option.value}>
            <button
              onClick={() => handleThemeChange(option.value)}
              className={cn([
                'flex items-center gap-3 transition-all duration-300',
                isActive ? [
                  'active cursor-default bg-primary/10 text-primary',
                  'border-l-4 border-primary shadow-md shadow-primary/10'
                ] : 'cursor-pointer hover:bg-base-200/50'
              ])}
              disabled={isActive}
            >
              <IconComponent className={cn([
                'w-4 h-4 transition-all duration-300',
                isActive ? 'text-primary drop-shadow-sm' : 'text-current'
              ])} />
              <span>{option.label}</span>
              {option.value === AppThemes.SYSTEM && (
                <span className="text-xs opacity-60 ml-auto">
                  ({isSystemDark ? 'Dark' : 'Light'})
                </span>
              )}
            </button>
          </li>
        );
      })}
    </Dropdown>
  );
}
