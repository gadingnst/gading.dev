'use client';

import { Download, ZoomIn } from 'lucide-react';
import { useState } from 'react';

import cn from '@/designs/utils/cn';
import useImageTools from '@/packages/libs/Images/useImageTools';

import Image, { ImageProps } from './Image';

interface ImageWithToolsProps extends ImageProps {
  enableZoom?: boolean;
  enableDownload?: boolean;
}

function ImageWithTools(props: ImageWithToolsProps) {
  const { src, enableZoom = true, enableDownload = true, ...imageProps } = props;
  const [isHovered, setIsHovered] = useState(false);
  const { handleZoom, handleDownload } = useImageTools(src?.toString());

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image {...imageProps} src={src} alt={imageProps.alt || ''} />
      {isHovered && (
        <div
          className={cn(
            'absolute bottom-4 right-2 flex items-center gap-2 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          {enableZoom && (
            <button
              onClick={handleZoom}
              className="rounded-full cursor-pointer bg-black/30 p-2 text-white backdrop-blur-sm hover:bg-black/60"
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
