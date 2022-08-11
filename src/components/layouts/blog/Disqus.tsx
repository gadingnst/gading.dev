import { FunctionComponent } from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { DISQUS_SHORTNAME } from '@/utils/config';

interface Props {
  url: string;
  identifier: string;
  title: string;
  locale?: 'en'|'id'|string;
}

const Disqus: FunctionComponent<Props> = (props) => {
  return (
    <div className="container max-w-5xl mt-40 mx-auto">
      <DiscussionEmbed
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
