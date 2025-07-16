import Link from '@/packages/components/base/Navigations/Link';

function ContentLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, ...restProps } = props;
  const isExternal = href?.startsWith('http') || href?.startsWith('//');

  return (
    <Link
      href={href || '#'}
      external={isExternal}
      {...restProps}
    />
  );
}

export default ContentLink;
