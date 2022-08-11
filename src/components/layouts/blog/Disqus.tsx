import { FunctionComponent, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { DISQUS_SHORTNAME } from '@/utils/config';
import useAppTheme from '@/hooks/stores/useAppTheme';
import { useUpdated } from '@/hooks';

interface Props {
  url: string;
  identifier: string;
  title: string;
  locale?: 'en'|'id'|string;
}

const Disqus: FunctionComponent<Props> = (props) => {
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
        key={+isDark}
        shortname={DISQUS_SHORTNAME}
        config={
          {
            ...props,
            language: props.locale === 'id' ? 'id' : undefined
          }
        }
      />
    </div>
  );
};

export default Disqus;
