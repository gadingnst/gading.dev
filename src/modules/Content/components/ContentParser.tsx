'use client';
/* eslint-disable react-hooks/static-components */

import 'katex/dist/katex.min.css';

import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import { Children, ComponentProps, isValidElement, PropsWithChildren, useMemo } from 'react';

import cn from '@/designs/utils/cn';
import ContentCodeBlock from '@/modules/Content/components/ContentCodeBlock';
import Button from '@/packages/components/base/Buttons/Button';

import ContentImage from './ContentImage';
import ContentLink from './ContentLink';
import State from './StatefulMDX';
import TwitterScript from './TwitterScript';

// Markdown wraps standalone images in <p>, but ContentImage renders a <figure>,
// which is invalid inside <p> and breaks hydration. Use a <div> for those paragraphs.
function ContentParagraph(props: ComponentProps<'p'>) {
  const hasImage = Children.toArray(props.children)
    .some((child) => isValidElement(child) && child.type === ContentImage);
  return hasImage ? <div {...props} /> : <p {...props} />;
}

export interface Props extends MDXContentProps {
  className?: string;
}

function ContentParser(props: PropsWithChildren<Props>) {
  const { children, className = '', components, ...otherProps } = props;

  const Parser = useMemo(() => {
    return getMDXComponent(children as string);
  }, [children]);

  return (
    <div className={cn(['w-full max-w-full prose prose-sm sm:prose-base parser', className])}>
      <Parser
        {...otherProps}
        components={{
          ...components,
          Button,
          State,
          TwitterScript,
          a: ContentLink,
          img: ContentImage,
          p: ContentParagraph,
          pre: ContentCodeBlock
        }}
      />
    </div>
  );
};

export default ContentParser;
