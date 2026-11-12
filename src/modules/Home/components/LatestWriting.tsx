import { getBlogList } from '@/modules/Content/services/content-parser';
import { I18nLocales } from '@/packages/libs/I18n/interface';

import withHomeLocales from '../Home.locales';
import PostCard from './PostCard';
import SectionHead from './SectionHead';

const POSTS_ON_HOME = 3;

interface Props {
  lang: I18nLocales;
}

/** The newest posts by date, straight from the content directory */
async function LatestWriting({ lang }: Props) {
  const content = withHomeLocales(lang);
  const { contents } = await getBlogList(lang, { limit: POSTS_ON_HOME });

  return (
    <section>
      <SectionHead
        title={content.writingTitle}
        hand={<small className="ml-2.5 font-hand text-[25px] font-semibold tracking-normal text-teal">{content.writingHand}</small>}
        description={content.writingDesc}
        linkLabel={content.allPosts}
        linkHref="/blog"
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {contents.map((post) => (
          <PostCard key={post.slugOriginal} post={post} />
        ))}
      </div>
    </section>
  );
}

export default LatestWriting;
