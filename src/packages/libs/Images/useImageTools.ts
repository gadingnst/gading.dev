import { MouseEvent, TouchEvent, useCallback, useState } from 'react';

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

  const handleDragStart = (clientX: number, clientY: number) => {
    if (zoom > MIN_ZOOM) {
      setIsDragging(true);
      setStartDragPosition({
        x: clientX - position.x,
        y: clientY - position.y
      });
    }
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (isDragging && zoom > MIN_ZOOM) {
      const newX = clientX - startDragPosition.x;
      const newY = clientY - startDragPosition.y;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    handleDragEnd();
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    handleDragEnd();
  };

  const handleTouchStart = (e: TouchEvent<HTMLElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
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
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
}

export default useImageTools;
