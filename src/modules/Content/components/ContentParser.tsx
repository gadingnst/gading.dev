'use client';

import 'katex/dist/katex.min.css';

import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import { PropsWithChildren, useMemo } from 'react';

import cn from '@/designs/utils/cn';
import ContentCodeBlock from '@/modules/Content/components/ContentCodeBlock';
import Button from '@/packages/components/base/Buttons/Button';

import ContentImage from './ContentImage';
import ContentLink from './ContentLink';
import State from './StatefulMDX';
import TwitterScript from './TwitterScript';

export interface Props extends MDXContentProps {
  className?: string;
}

function ContentParser(props: PropsWithChildren<Props>) {
  const { children, className = '', components, ...otherProps } = props;

  const Parser = useMemo(() => {
    return getMDXComponent(children as string);
  }, [children]);

  return (
    <div className={cn(['w-full max-w-full prose parser', className])}>
      <Parser
        {...otherProps}
        components={{
          ...components,
          Button,
          State,
          TwitterScript,
          a: ContentLink,
          img: ContentImage,
          pre: ContentCodeBlock
        }}
      />
    </div>
  );
};

export default ContentParser;
