'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import Dropdown from '@/packages/components/base/Floatings';
import { AppThemes } from '@/packages/libs/AppTheme/constants';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';
import { getThemeIcon, getThemeLabel, themeOptions } from '@/packages/libs/AppTheme/utils';

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
