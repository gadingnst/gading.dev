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
      <div className="base-container py-5">
        Hello Footer
      </div>
    </footer>
  );
}

export default Footer;
