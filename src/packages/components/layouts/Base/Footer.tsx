import cxm from '@/packages/utils/cxm';

interface Props {
  className?: string;
}

function Footer({ className }: Props) {
  return (
    <footer
      className={cxm([
        'flex-shrink-0',
        className
      ])}
    >
      Hello Footer
    </footer>
  );
}

export default Footer;
