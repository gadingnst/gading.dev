import { Fragment, FunctionComponent, PropsWithChildren, useCallback, useId, useMemo } from 'react';
import NextLink from 'next/link';
import Script, { ScriptProps } from 'next/script';
import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import * as SharedComponents from '@/components/base';
import State from './StatefulMDX';
import { useMounted } from '@/hooks';

import clsxm from '@/utils/helpers/clsxm';
import styles from './Parser.module.css';
import 'katex/dist/katex.min.css';

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
      <SharedComponents.Image
        zoomable
        src={src}
        alt={alt}
        delayLoad={500}
        wrapperClassName="content-image items-center w-full rounded-8"
        className="mx-auto rounded-8 max-h-[500px] cursor-pointer"
      />
      <span className="block text-center italic text-xs mt-8">
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
      <SharedComponents.NextImage
        src={src}
        alt={alt}
        width={carousel ? width / 3 : width}
        height={carousel ? height / 3 : height}
        className={clsxm([
          'mx-auto rounded-8 cursor-pointer my-8',
          carousel && 'mx-4'
        ])}
      />
    </NextLink>
  );
};

/**
 * handle Twitter embed for SPA
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/guides/scripting-loading-and-initialization
 */
const TwitterScript: FunctionComponent<ScriptProps> = (props) => {
  const { onLoad } = props;
  const scriptId = useId();

  const handleLoad = useCallback((e: any) => {
    window.twttr?.widgets.load();
    onLoad?.(e);
  }, []);

  useMounted(() => {
    return () => {
      document.getElementById(scriptId)?.remove();
    };
  });

  return (
    <SharedComponents.LazyLoad>
      <Script
        async
        defer
        {...props}
        id={scriptId}
        onLoad={handleLoad}
        src="https://platform.twitter.com/widgets.js"
      />
    </SharedComponents.LazyLoad>
  );
};

const ContentParser: FunctionComponent<PropsWithChildren<Props>> = (props) => {
  const { children, className, components, ...otherProps } = props;

  const Parser = useMemo(() => {
    return getMDXComponent(children as string);
  }, [children]);

  return (
    <div className={clsxm('content-parser', styles.parser, className)}>
      <Parser
        {...otherProps}
        components={{
          ...components,
          ...SharedComponents,
          State,
          TwitterScript,
          a: SharedComponents.Link,
          img: ContentImage,
          NextImage: NextContentImage
        } as any}
      />
    </div>
  );
};

ContentParser.defaultProps = {
  className: ''
};

export default ContentParser;
