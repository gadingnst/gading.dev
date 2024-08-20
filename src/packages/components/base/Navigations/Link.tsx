import UnstyledLink, { type Props } from '@/packages/components/base/Navigations/UnstyledLink';
import cn from '@/packages/utils/cn';

/** @see https://daisyui.com/components/link/ */
function Link(props: Props) {
  return (
    <UnstyledLink
      {...props}
      className={cn([
        'link underline-offset-4 decoration-dashed no-underline hover:underline',
        props.className
      ])}
    />
  );
}

export default Link;
