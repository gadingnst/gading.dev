'use client';

import cn from '@/designs/utils/cn';
import useClipboard from '@/packages/hooks/useClipboard';

interface ColorCardProps {
  name: string;
  className: string;
  textColorClassName?: string;
}

function ColorCard({ name, className, textColorClassName }: ColorCardProps) {
  const { copyHandler, isCopied } = useClipboard(name, 1000);

  return (
    <div
      className={cn([
        'h-24 w-full rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer',
        className,
        textColorClassName
      ])}
      onClick={copyHandler}
    >
      {isCopied ? 'Copied!' : name}
    </div>
  );
}

export default ColorCard;
