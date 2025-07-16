'use client';

import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import useImageTools from '@/packages/libs/Images/useImageTools';

import Image, { ImageProps } from './Image';

interface ImageWithToolsProps extends ImageProps {
  enableZoom?: boolean;
  enableDownload?: boolean;
}

function ImageWithTools(props: ImageWithToolsProps) {
  const { src, enableZoom = true, enableDownload = true, className, ...imageProps } = props;
  const [isHovered, setIsHovered] = useState(false);
  const {
    zoom,
    position,
    isPannable,
    isDragging,
    showZoomIn,
    showZoomOut,
    handleZoomIn,
    handleZoomOut,
    handleDownload,
    panProps
  } = useImageTools(src?.toString());

  const imageStyle = {
    transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
    cursor: isPannable ? (isDragging ? 'grabbing' : 'grab') : 'auto',
    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
  };

  return (
    <div
      className="relative inline-block overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        {...imageProps}
        {...panProps}
        src={src}
        alt={imageProps.alt || ''}
        style={imageStyle}
        className={cn(className)}
      />
      {isHovered && (
        <div
          className={cn(
            'absolute bottom-4 right-2 flex items-center gap-2 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
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
    </div>
  );
}

export default ImageWithTools;
