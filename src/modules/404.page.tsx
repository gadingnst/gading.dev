'use client';

import { useMemo } from 'react';

import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import createContentLocales from '@/packages/libs/I18n/locales';

const withLocales = createContentLocales({
  title: {
    en: 'Page Not Found',
    id: 'Halaman Tidak Ditemukan'
  },
  description: {
    en: 'The page you are looking for doesn\'t exist or has been moved.',
    id: 'Halaman yang Anda cari tidak ditemukan atau telah dipindahkan.'
  },
  button: {
    en: 'Go Home',
    id: 'Kembali ke Beranda'
  }
});

function NotFoundPage() {
  const language = useLangugage();

  const locales = useMemo(() => withLocales(language), [language]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-base-content px-8">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-error">404</h1>
        <h2 className="text-2xl font-semibold">{locales.title}</h2>
        <p className="text-base opacity-80 max-w-md">
          {locales.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <NextLink withCurrentLocale href="/" className="btn btn-primary">
            {locales.button}
          </NextLink>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
