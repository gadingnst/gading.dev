'use client';

import 'katex/dist/katex.min.css';

import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import { FunctionComponent, PropsWithChildren, useMemo } from 'react';

import cn from '@/designs/utils/cn';
import ContentImage from '@/modules/ContentParser/components/ContentImage';
import ContentLink from '@/modules/ContentParser/components/ContentLink';
import TwitterScript from '@/modules/ContentParser/components/TwitterScript';
import Button from '@/packages/components/base/Buttons/Button';

import State from './StatefulMDX';

export interface Props extends MDXContentProps {
  className?: string;
}

const ContentParser: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, className = '', components, ...otherProps } = props;

  const Parser = useMemo(() => {
    return getMDXComponent(children as string);
  }, [children]);

  return (
    <div
      className={cn([
        'w-full max-w-full prose parser',
        className
      ])}
    >
      <Parser
        {...otherProps}
        components={{
          ...components,
          Button,
          State,
          TwitterScript,
          a: ContentLink,
          img: ContentImage
        }}
      />
    </div>
  );
};

export default ContentParser;
