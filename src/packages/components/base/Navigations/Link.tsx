import NextLink, { Props } from '@/packages/components/base/Navigations/NextLink';
import cxm from '@/packages/utils/cxm';

function Link(props: Props) {
  return (
    <NextLink
      {...props}
      className={cxm([
        'link link-primary underline-offset-4 decoration-dashed no-underline hover:underline',
        props.className
      ])}
    />
  );
}

export default Link;
