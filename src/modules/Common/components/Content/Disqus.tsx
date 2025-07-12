'use client';

import { DiscussionEmbed } from 'disqus-react';
import { useState } from 'react';

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

function Disqus(props: Props) {
  const { title, path, identifier } = props;
  const language = useLangugage();

  const { appTheme } = useAppTheme();

  const [showDisqus, setShowDisqus] = useState(false);

  const handleAfterLoad = () => {
    setShowDisqus(true);
  };

  return (
    <LazyLoadComponent afterLoad={handleAfterLoad}>
      <div className="base-container disqus-container mt-10 mx-auto">
        {showDisqus && (
          <DiscussionEmbed
            key={`${language}-${appTheme}`}
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

export default Disqus;
