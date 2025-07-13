'use client';

import { useEffect } from 'react';

import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';

function AppThemeInitializer() {
  const { appTheme } = useAppTheme();

  useEffect(() => {
    document.body.setAttribute('data-theme', appTheme);
  }, [appTheme]);

  return null;
}

export default AppThemeInitializer;
