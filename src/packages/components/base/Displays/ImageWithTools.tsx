'use client';

import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { PropsWithChildren, useRef, useState } from 'react';

import cn from '@/designs/utils/cn';
import useImageTools from '@/packages/libs/Images/useImageTools';

import Image, { ImageProps } from './Image';

interface ImageWithToolsProps extends ImageProps {
  enableZoom?: boolean;
  enableDownload?: boolean;
  figureClassName?: string;
  toolsWrapperClassName?: string;
}

function ImageWithTools(props: PropsWithChildren<ImageWithToolsProps>) {
  const { src, enableZoom, enableDownload, figureClassName, toolsWrapperClassName, children, ...imageProps } = props;
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const {
    isPannable,
    isDragging,
    showZoomIn,
    showZoomOut,
    handleZoomIn,
    handleZoomOut,
    handleDownload,
    panProps
  } = useImageTools(src?.toString(), imageRef);

  const imageStyle = {
    cursor: isPannable ? (isDragging ? 'grabbing' : 'grab') : 'auto',
    transition: 'transform 0.2s ease-out',
    touchAction: 'none'
  };

  return (
    <figure
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn([
        'relative inline-block overflow-hidden',
        figureClassName
      ])}
    >
      <Image
        {...imageProps}
        {...panProps}
        ref={imageRef}
        src={src}
        alt={imageProps.alt || ''}
        style={imageStyle}
      />
      {isHovered && (
        <div
          className={cn(
            'absolute bottom-4 right-2 flex items-center gap-2 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0',
            toolsWrapperClassName
          )}
        >
          {enableZoom && showZoomOut && (
            <button
              onClick={handleZoomOut}
              className="rounded-full cursor-pointer bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/60"
              aria-label="Zoom Out"
            >
              <ZoomOut size={16} />
            </button>
          )}
          {enableZoom && (
            <button
              disabled={!showZoomIn}
              onClick={handleZoomIn}
              className={cn([
                'rounded-full cursor-pointer bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/60',
                !showZoomIn && 'opacity-15 cursor-not-allowed'
              ])}
              aria-label="Zoom In"
            >
              <ZoomIn size={16} />
            </button>
          )}
          {enableDownload && (
            <button
              onClick={handleDownload}
              className="rounded-full cursor-pointer bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/60"
              aria-label="Download Image"
            >
              <Download size={16} />
            </button>
          )}
        </div>
      )}
      {children}
    </figure>
  );
}

export default ImageWithTools;
