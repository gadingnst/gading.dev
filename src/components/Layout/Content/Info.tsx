import { FunctionComponent } from 'react';
import { MetaContents } from '@/server/content-parser';
import postDate from '@/utils/helpers/post-date';

export interface Props {
  meta: MetaContents;
  locale?: string;
  className?: string;
  colorClassName?: string;
}

const ContentInfo: FunctionComponent<Props> = (props) => {
  const { meta, locale, className, colorClassName } = props;
  return (
    <div className={`${className} ${colorClassName}`}>
      <span className={`${colorClassName} pr-8 -mr-2`}>
        🗓
      </span>
      <span className={`${colorClassName} mr-4`}>
        {postDate(meta.date, locale)}
      </span>
        •
      <span className={`${colorClassName} ml-4 pr-8 -mr-2`}>
        ☕️
      </span>
      <span className={colorClassName}>
        {meta.readTime.text}
      </span>
    </div>
  );
};

ContentInfo.defaultProps = {
  className: '',
  colorClassName: 'text-light-20 dark:text-light-20'
};

export default ContentInfo;
