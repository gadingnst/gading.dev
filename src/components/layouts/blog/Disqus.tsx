import { FunctionComponent, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { DISQUS_SHORTNAME, PRODUCTION_URL } from '@/utils/config';
import useAppTheme from '@/hooks/stores/useAppTheme';
import { useUpdated } from '@/hooks';

interface Props {
  slug: string;
  title: string;
  identifier: string;
  locale?: 'en'|'id'|string;
}

const Disqus: FunctionComponent<Props> = (props) => {
  const { locale, slug } = props;
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
        config={
          {
            ...props,
            url: `${PRODUCTION_URL}/${locale}/blog/${slug}`,
            language: locale === 'id' ? 'id' : undefined
          }
        }
      />
    </div>
  );
};

export default Disqus;
