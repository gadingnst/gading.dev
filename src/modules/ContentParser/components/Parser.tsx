'use client';

import 'katex/dist/katex.min.css';

import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import Script, { ScriptProps } from 'next/script';
import { FunctionComponent, PropsWithChildren, useId, useMemo } from 'react';

import cn from '@/designs/utils/cn';
import Button from '@/packages/components/base/Buttons/Button';
import Image from '@/packages/components/base/Displays/Image';
import Link from '@/packages/components/base/Navigations/Link';

import State from './StatefulMDX';

export interface Props extends MDXContentProps {
  className?: string;
}

interface ContentImageProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  carousel?: string;
}

/**
 * handle Image showing in Content
 */
const ContentImage: FunctionComponent<ContentImageProps> = (props) => {
  const { src, alt } = props;

  return (
    <figure className="flex flex-col items-center min-h-[300px] w-full justify-center my-4 rounded-lg overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        className="w-full h-full min-h-[540px] min-w-[800px] max-h-[540px] max-w-[800px] cursor-pointer mb-0"
        wrapperClassName="w-full h-full min-h-[540px] min-w-[800px] max-h-[540px] max-w-[800px]"
        loading="lazy"
      />
      <figcaption className="block text-center italic text-xs mt-2 text-base-content">
        [Image] {alt}
      </figcaption>
    </figure>
  );
};

function ContentLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, ...restProps } = props;
  const isExternal = href?.startsWith('http') || href?.startsWith('//');

  return (
    <Link
      href={href || '#'}
      external={isExternal}
      {...restProps}
    />
  );
}

/**
 * handle Twitter embed for SPA
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization
 */
const TwitterScript: FunctionComponent<ScriptProps> = (props) => {
  const scriptId = useId();

  return (
    <Script
      async
      defer
      {...props}
      id={scriptId}
      src="https://platform.twitter.com/widgets.js"
    />
  );
};

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
