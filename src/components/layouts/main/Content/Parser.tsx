import { Fragment, FunctionComponent, PropsWithChildren, useMemo } from 'react';
import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client';
import * as SharedComponents from '@/components/base';
import State from './StatefulMDX';

import clsxm from '@/utils/helpers/clsxm';
import styles from './parser.module.css';
import 'katex/dist/katex.min.css';

export interface Props extends MDXContentProps {
  className?: string;
}

interface ContentImageProps {
  src: string;
  alt: string;
}

const ContentImage: FunctionComponent<ContentImageProps> = (props) => {
  const { src, alt } = props;
  return (
    <Fragment>
      <SharedComponents.ImageLazy
        zoomable
        src={src}
        alt={alt}
        wrapperClassName="content-image items-center w-full"
        className="mx-auto rounded-8 max-h-[500px] cursor-pointer"
      />
      <span className="block text-center italic text-xs mt-8">
        {alt}
      </span>
    </Fragment>
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
          a: SharedComponents.Link,
          img: ContentImage
        } as any}
      />
    </div>
  );
};

ContentParser.defaultProps = {
  className: ''
};

export default ContentParser;
