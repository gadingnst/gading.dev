'use client';

import { Check, Copy } from 'lucide-react';
import { ComponentProps, isValidElement, PropsWithChildren } from 'react';

import cn from '@/designs/utils/cn';
import useClipboard from '@/packages/hooks/useClipboard';

const getCodeString = (children: React.ReactNode): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getCodeString).join('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const _childrenProps = (children as any)?.props;
  if (isValidElement(children) && _childrenProps.children) {
    return getCodeString(_childrenProps.children);
  }
  return '';
};

function ContentCodeBlock({ children, className, ...props }: PropsWithChildren<ComponentProps<'pre'>>) {
  const code = getCodeString(children);
  const { isCopied, copyHandler } = useClipboard(code, 2000);

  return (
    <pre className={cn(className, 'relative group')} {...props}>
      <button
        onClick={copyHandler}
        aria-label="Copy code to clipboard"
        className={cn([
          'absolute top-2 right-2 backdrop-blur z-10 p-1.5 rounded-md bg-gray-800/70 text-gray-300 hover:text-white hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-200',
          !isCopied && 'cursor-pointer'
        ])}
      >
        {isCopied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
      </button>
      {children}
    </pre>
  );
}

export default ContentCodeBlock;
