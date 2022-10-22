import { FunctionComponent, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { AUTHOR_NAME, DISQUS_SHORTNAME, PRODUCTION_URL } from '@/utils/config';
import useUpdated from '@/hooks/useUpdated';
import useAppTheme from '@/hooks/stores/useAppTheme';
import LazyLoad from '@/components/base/LazyLoad';

interface Props {
  path: string;
  title: string;
  identifier: string;
  locale?: 'en'|'id'|string;
}

const Disqus: FunctionComponent<Props> = (props) => {
  const { title, locale, path, identifier } = props;
  const [theme] = useAppTheme();
  const [isDark, setIsDark] = useState(theme.current === 'light' ? false : true);

  useUpdated(() => {
    setTimeout(() => {
      setIsDark(!isDark);
    }, 250);
  }, [theme.current]);

  return (
    <div className="container max-w-5xl mt-40 mx-auto">
      <LazyLoad>
        <DiscussionEmbed
          key={`${locale}-${+isDark}`}
          shortname={DISQUS_SHORTNAME}
          config={{
            title: `${title} | ${AUTHOR_NAME}`,
            url: `${PRODUCTION_URL}/${path}`,
            identifier: `${DISQUS_SHORTNAME}_${identifier}`,
            language: locale === 'id' ? 'id' : undefined
          }}
        />
      </LazyLoad>
    </div>
  );
};

export default Disqus;
