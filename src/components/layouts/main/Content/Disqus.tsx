import { FunctionComponent, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { AUTHOR_NAME, DISQUS_SHORTNAME, PRODUCTION_URL } from '@/utils/config';
import useAppTheme from '@/hooks/stores/useAppTheme';
import { useUpdated } from '@/hooks';

interface Props {
  url: string;
  title: string;
  identifier: string;
  locale?: 'en'|'id'|string;
}

const Disqus: FunctionComponent<Props> = (props) => {
  const { title, locale, url, identifier } = props;
  const [theme] = useAppTheme();
  const [isDark, setIsDark] = useState(theme.current === 'light' ? false : true);

  useUpdated(() => {
    setTimeout(() => {
      setIsDark(!isDark);
    }, 250);
  }, [theme.current]);

  return (
    <div className="container max-w-5xl mt-40 mx-auto">
      <DiscussionEmbed
        key={`${locale}-${+isDark}`}
        shortname={DISQUS_SHORTNAME}
        config={{
          title: `${title} | ${AUTHOR_NAME}`,
          url: `${PRODUCTION_URL}/${url}`,
          identifier: `${DISQUS_SHORTNAME}_${identifier}`,
          language: locale === 'id' ? 'id' : undefined
        }}
      />
    </div>
  );
};

export default Disqus;