'use client';

import { DiscussionEmbed } from 'disqus-react';
import { FunctionComponent, useMemo, useState } from 'react';

import { AUTHOR_NAME } from '@/configs/author';
import { DISQUS_SHORTNAME, PRODUCTION_URL } from '@/configs/sites';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import LazyLoadComponent from '@/packages/components/base/Displays/LazyLoad/LazyLoadComponent';
import useUpdated from '@/packages/hooks/useUpdated';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';
import { isThemeDark } from '@/packages/libs/AppTheme/utils';

interface Props {
  path: string;
  title: string;
  identifier: string;
}

const Disqus: FunctionComponent<Props> = (props) => {
  const { title, path, identifier } = props;
  const { appTheme } = useAppTheme();

  const language = useLangugage();

  const isDarkTheme = useMemo(() => isThemeDark(appTheme), [appTheme]);

  const [isDark, setIsDark] = useState(isDarkTheme);

  useUpdated(() => {
    setTimeout(() => {
      setIsDark(!isDarkTheme);
    }, 250);
  }, [isDarkTheme]);

  return (
    <div className="base-container mt-10 mx-auto">
      <LazyLoadComponent>
        <DiscussionEmbed
          key={`${language}-${+isDark}`}
          shortname={DISQUS_SHORTNAME}
          config={{
            title: `${title} | ${AUTHOR_NAME}`,
            url: `${PRODUCTION_URL}/${path}`,
            identifier: `${DISQUS_SHORTNAME}_${identifier}`,
            language: language === 'id' ? 'id' : undefined
          }}
        />
      </LazyLoadComponent>
    </div>
  );
};

export default Disqus;
