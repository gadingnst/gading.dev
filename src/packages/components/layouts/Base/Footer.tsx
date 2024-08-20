import cn from '@/packages/utils/cn';

interface Props {
  className?: string;
}

function Footer({ className }: Props) {
  return (
    <footer
      className={cn([
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
