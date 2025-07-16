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
  const { handleZoom, handleDownload } = useImageTools(src as string);

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
            'absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          {enableZoom && (
            <button
              onClick={handleZoom}
              className="p-2 text-white rounded-full bg-gray-800 bg-opacity-75 hover:bg-opacity-100 mx-1"
              aria-label="Zoom In"
            >
              <ZoomIn size={24} />
            </button>
          )}
          {enableDownload && (
            <button
              onClick={handleDownload}
              className="p-2 text-white rounded-full bg-gray-800 bg-opacity-75 hover:bg-opacity-100 mx-1"
              aria-label="Download Image"
            >
              <Download size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageWithTools;
