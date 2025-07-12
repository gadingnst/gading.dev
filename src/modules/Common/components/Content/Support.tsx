'use client';

import { useMemo } from 'react';

import cn from '@/designs/utils/cn';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';
import createContentLocales from '@/packages/libs/I18n/locales';

const supportLinks = [
  {
    label: 'GitHub Sponsors',
    url: 'https://github.com/sponsors/gadingnst',
    className: 'bg-github text-white dark:text-white'
  },
  {
    label: 'Ko-fi',
    url: 'https://ko-fi.com/gadingnst',
    className: 'bg-[#29ABE0] text-white dark:text-white'
  },
  {
    label: 'Trakteer',
    url: 'https://trakteer.id/gadingnst',
    className: 'bg-[#FF4646] text-white dark:text-white'
  },
  {
    label: 'Karyakarsa',
    url: 'https://karyakarsa.com/gadingnst',
    className: 'bg-[#FFB800] text-black dark:text-black'
  }
];

const withLocales = createContentLocales({
  support: {
    en: 'Support Me',
    id: 'Dukung Saya'
  }
});

function Support() {
  const language = useLangugage();
  const locales = useMemo(() => withLocales(language), [language]);
  return (
    <div className="mt-24 text-center">
      <h4 className="text-center mb-12">
        {locales.support}
      </h4>
      <div className="flex justify-center flex-wrap gap-8">
        {supportLinks.map(({ label, url, className }) => (
          <ButtonLink
            key={label}
            label={label}
            href={url}
            className={cn([
              'px-1.5 py-1 rounded-md shadow-md',
              className
            ])}
          >
            {label}
          </ButtonLink>
        ))}
      </div>
    </div>
  );
};

export default Support;
