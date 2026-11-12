import cn from '@/designs/utils/cn';
import type { ContentMeta } from '@/modules/Content/services/content-parser';
import NextLink from '@/packages/components/base/Navigations/NextLink';
import dt from '@/packages/libs/DayJS/dt';

interface Props {
  post: ContentMeta;
  className?: string;
}

/** Post card of the Home "Latest writing" row; hover is the `lift` utility (fun element 6) */
function PostCard({ post, className }: Props) {
  const tag = post.tags?.find((item) => item.toLowerCase() !== 'featured');

  return (
    <article className={cn(['lift relative flex flex-col gap-2.5 rounded-[20px] bg-card p-6 shadow-soft', className])}>
      {tag && (
        <span className="self-start rounded-full bg-lilac-soft px-[11px] py-1 font-mono text-xs font-medium text-lilac">
          #{tag}
        </span>
      )}
      <h3 className="font-display text-[19px] font-bold leading-[1.3]">
        {/* stretched link: the whole card is the click target */}
        <NextLink
          withCurrentLocale
          href={`/blog/${post.slugOriginal}`}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {post.title}
        </NextLink>
      </h3>
      <p className="line-clamp-3 text-sm text-muted">{post.description}</p>
      <span className="mt-auto pt-1 font-mono text-xs text-muted">
        {dt(post.date).format('MMM DD, YYYY')} · {Math.max(1, Math.ceil(post.readTime.minutes))} min
      </span>
    </article>
  );
}

export default PostCard;
