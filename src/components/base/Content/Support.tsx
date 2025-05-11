// components/common/SupportButtons.tsx

import { FunctionComponent, useMemo } from 'react';
import { Button } from '@/components/base';
import createContentLocales from '@/utils/helpers/locales';
import { I18nLocales } from '@/types/contents';

interface Props {
  locale: I18nLocales|string;
}

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

const Support: FunctionComponent<Props> = ({ locale }) => {
  const locales = useMemo(() => withLocales(locale), [locale]);
  return (
    <div className="mt-24 text-center">
      <h4 className="text-center mb-12">
        {locales.support}
      </h4>
      <div className="flex justify-center flex-wrap gap-8">
        {supportLinks.map(({ label, url, className }) => (
          <Button
            key={label}
            label={label}
            href={url}
            className={`${className} px-6 py-3 rounded-8 shadow-md hover:scale-105 transition-transform`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Support;
