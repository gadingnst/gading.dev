'use client';
/* eslint-disable react-hooks/static-components */

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import Dropdown from '@/packages/components/base/Floatings/Dropdown';
import { AppThemes } from '@/packages/libs/AppTheme/constants';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';
import { getThemeIcon, getThemeLabel, themeOptions } from '@/packages/libs/AppTheme/utils';

export default function AppThemeSelector() {
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
      liquidGlass
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
                'flex items-center gap-3 transition-all duration-300 text-white/90 hover:text-white',
                'cursor-pointer hover:bg-white/15',
                isActive && [
                  'opacity-60 pointer-events-none cursor-not-allowed',
                  'active cursor-default bg-white/20 text-white font-semibold',
                  'border-l-4 border-primary shadow-md'
                ]
              ])}
              disabled={isActive}
            >
              <IconComponent
                className="w-4 h-4 transition-all duration-300 text-current"
              />
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
