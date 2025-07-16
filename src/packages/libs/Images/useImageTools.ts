import { MouseEvent, useCallback, useState } from 'react';

import { downloadFile } from '@/packages/libs/File/download';

const ZOOM_STEP = 0.5;
const MAX_ZOOM = 3;
const MIN_ZOOM = 1;

interface Position {
  x: number;
  y: number;
}

function useImageTools(imageUrl?: string) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState<Position>({ x: 0, y: 0 });

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => {
      const newZoom = Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM);
      if (newZoom === MIN_ZOOM) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    if (zoom > MIN_ZOOM) {
      e.preventDefault();
      setIsDragging(true);
      setStartDragPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (isDragging && zoom > MIN_ZOOM) {
      e.preventDefault();
      const newX = e.clientX - startDragPosition.x;
      const newY = e.clientY - startDragPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = (e: MouseEvent<HTMLElement>) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
    }
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    if (isDragging) {
      e.preventDefault();
      setIsDragging(false);
    }
  };

  const handleDownload = useCallback(() => {
    if (imageUrl) {
      downloadFile({
        data: imageUrl,
        fileName: imageUrl.substring(imageUrl.lastIndexOf('/') + 1),
        fileType: 'image/png'
      });
    }
  }, [imageUrl]);

  const isPannable = zoom > MIN_ZOOM;
  const showZoomIn = zoom < MAX_ZOOM;
  const showZoomOut = zoom > MIN_ZOOM;

  return {
    zoom,
    position,
    isPannable,
    isDragging,
    showZoomIn,
    showZoomOut,
    handleZoomIn,
    handleZoomOut,
    handleDownload,
    panProps: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave
    }
  };
}

export default useImageTools;
