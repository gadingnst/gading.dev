'use client';

import { DiscussionEmbed } from 'disqus-react';
import { useEffect, useState } from 'react';

import { AUTHOR_NAME } from '@/configs/author';
import { DISQUS_SHORTNAME, PRODUCTION_URL } from '@/configs/sites';
import useLangugage from '@/modules/Common/libs/i18n/i18n.client';
import LazyLoadComponent from '@/packages/components/base/Displays/LazyLoad/LazyLoadComponent';
import useAppTheme from '@/packages/libs/AppTheme/useAppTheme';

interface Props {
  path: string;
  title: string;
  identifier: string;
}

function ContentDisqus(props: Props) {
  const { title, path, identifier } = props;
  const language = useLangugage();

  const { appTheme } = useAppTheme();

  const [disqusKey, setDisqusKey] = useState('');

  useEffect(() => {
    setDisqusKey('');
    const timer = setTimeout(() => {
      setDisqusKey(`${language}-${appTheme}`);
    }, 1000);
    return () => clearTimeout(timer);
  }, [language, appTheme]);

  return (
    <LazyLoadComponent>
      <div className="base-container disqus-container mt-16 mx-auto">
        {!!disqusKey && (
          <DiscussionEmbed
            key={disqusKey}
            shortname={DISQUS_SHORTNAME}
            config={{
              title: `${title} | ${AUTHOR_NAME}`,
              url: `${PRODUCTION_URL}/${path}`,
              identifier: `${DISQUS_SHORTNAME}_${identifier}`,
              language: language === 'id' ? 'id' : undefined
            }}
          />
        )}
      </div>
    </LazyLoadComponent>
  );
};

export default ContentDisqus;
