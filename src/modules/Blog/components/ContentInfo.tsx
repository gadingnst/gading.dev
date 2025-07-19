import { Calendar, Clock } from 'lucide-react';

import cn from '@/designs/utils/cn';
import { ContentMeta } from '@/modules/Content/services/content-parser';
import dt from '@/packages/libs/DayJS/dt';

interface Props {
  meta: ContentMeta;
  className?: string;
}

function BlogContentInfo({ meta, className }: Props) {
  const formattedDate = dt(meta.date).format('MMM DD, YYYY');
  const readTimeText = meta.readTime.text;
  return (
    <div
      className={cn([
        'flex items-center justify-center text-xs gap-x-2',
        className
      ])}
    >
      <div className="flex items-center gap-x-1">
        <Calendar className="w-3 h-3" />
        <span>{formattedDate}</span>
      </div>
      •
      <div className="flex items-center gap-x-1">
        <Clock className="w-3 h-3" />
        <span>{readTimeText}</span>
      </div>
    </div>
  );
}

export default BlogContentInfo;
