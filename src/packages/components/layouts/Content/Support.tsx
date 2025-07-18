'use client';

import { useMemo } from 'react';

import cn from '@/designs/utils/cn';
import ButtonLink from '@/packages/components/base/Navigations/ButtonLink';
import useLangugage from '@/packages/libs/I18n/i18n.client';
import createContentLocales from '@/packages/libs/I18n/locales';
import { dasherize } from '@/packages/utils/helpers/string';

const supportLinks = [
  {
    label: 'GitHub Sponsors',
    url: 'https://github.com/sponsors/gadingnst',
    className: 'bg-[#333] shadow-gray-600'
  },
  {
    label: 'Ko-fi',
    url: 'https://ko-fi.com/gadingnst',
    className: 'bg-[#29ABE0] shadow-sky-400'
  },
  {
    label: 'Trakteer',
    url: 'https://trakteer.id/gadingnst',
    className: 'bg-[#FF4646] shadow-red-400'
  },
  {
    label: 'Karyakarsa',
    url: 'https://karyakarsa.com/gadingnst',
    className: 'bg-[#FFB800] shadow-yellow-400'
  }
];

const withLocales = createContentLocales({
  support: {
    en: 'Support Me',
    id: 'Dukung Saya'
  }
});

function ContentSupport() {
  const language = useLangugage();
  const locales = useMemo(() => withLocales(language), [language]);
  return (
    <div className="mt-10 text-center">
      <h4 className="text-center mb-3 font-semibold">
        {locales.support}
      </h4>
      <div className="flex justify-center flex-wrap gap-2">
        {supportLinks.map(({ label, url, className }) => (
          <ButtonLink
            target="_blank"
            rel="noopener noreferrer"
            key={label}
            label={label}
            href={url}
            data-umami-event={`support-${dasherize(label)}`}
            className={cn([
              'px-3 py-1 text-white rounded-full border-0 outline-0 shadow-none hover:shadow-lg',
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

export default ContentSupport;
