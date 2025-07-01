'use client';

import './Parser.css';
import 'katex/dist/katex.min.css';

import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import Script, { ScriptProps } from 'next/script';
import { Fragment, FunctionComponent, PropsWithChildren, useId, useMemo } from 'react';

import cn from '@/designs/utils/cn';
import Link from '@/packages/components/base/Navigations/Link';
import NextLink from '@/packages/components/base/Navigations/NextLink';

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
    <Fragment>
      <img
        src={src}
        alt={alt}
        className="mx-auto rounded-lg max-h-[500px] cursor-pointer"
        loading="lazy"
      />
      <span className="block text-center italic text-xs mt-2">
        {alt}
      </span>
    </Fragment>
  );
};

/**
 * handle Image showing in with NextImage
 */
const NextContentImage: FunctionComponent<ContentImageProps> = (props) => {
  const { src, alt, width, height, carousel } = props;
  return (
    <NextLink href={src} target="_blank">
      <img
        src={src}
        alt={alt}
        width={carousel ? width / 3 : width}
        height={carousel ? height / 3 : height}
        className={cn([
          'mx-auto rounded-lg cursor-pointer my-2',
          carousel && 'mx-1'
        ])}
      />
    </NextLink>
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
    <div className={cn('content-parser', 'parser', className)}>
      <Parser
        {...otherProps}
        components={{
          ...components,
          State,
          TwitterScript,
          a: ContentLink,
          img: ContentImage,
          NextImage: NextContentImage
        }}
      />
    </div>
  );
};

export default ContentParser;
