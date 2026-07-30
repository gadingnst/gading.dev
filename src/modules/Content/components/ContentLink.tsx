import Link from '@/packages/components/base/Navigations/Link';

function ContentLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, className, ...restProps } = props;
  const isExternal = href?.startsWith('http') || href?.startsWith('//');

  return (
    <Link
      href={href || '#'}
      external={isExternal}
      className={className}
      {...restProps}
    />
  );
}

export default ContentLink;
