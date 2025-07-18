'use client';

import { useEffect, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';
import useClipboard from '@/packages/hooks/useClipboard';

interface ColorCardProps {
  name: string;
  className: string;
  textColorClassName?: string;
}

function ColorCard({ name, className, textColorClassName }: ColorCardProps) {
  const [colorCode, setColorCode] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const { copyHandler, isCopied } = useClipboard(colorCode);

  useEffect(() => {
    const updateColorCode = () => {
      if (cardRef.current) {
        const color = getComputedStyle(cardRef.current).backgroundColor;
        setColorCode(color);
      }
    };

    updateColorCode();

    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateColorCode();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={cn([
        'h-28 w-full rounded-lg flex flex-col items-center justify-center text-sm font-medium',
        !isCopied && 'cursor-pointer',
        className,
        textColorClassName
      ])}
      onClick={copyHandler}
    >
      <span className="font-semibold">{isCopied ? 'Copied!' : name}</span>
      {colorCode && <span className="text-xs mt-1">{colorCode}</span>}
    </div>
  );
}

export default ColorCard;
