import { MouseEvent, RefObject, TouchEvent, useCallback, useEffect, useRef, useState } from 'react';

import { downloadFile } from '@/packages/libs/File/download';

const ZOOM_STEP = 0.5;
const MAX_ZOOM = 3;
const MIN_ZOOM = 1;

interface Position {
  x: number;
  y: number;
}

function useImageTools(imageUrl: string | undefined, imageRef: RefObject<HTMLImageElement|null>) {
  const [zoom, setZoom] = useState(MIN_ZOOM);
  const position = useRef<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startDragPosition = useRef<Position>({ x: 0, y: 0 });

  const updateImageTransform = useCallback(
    (currentZoom: number) => {
      if (imageRef.current) {
        const { x, y } = position.current;
        imageRef.current.style.transform = `scale(${currentZoom}) translate(${x}px, ${y}px)`;
      }
    },
    [imageRef]
  );

  useEffect(() => {
    updateImageTransform(zoom);
  }, [zoom, updateImageTransform]);

  const handleZoomIn = useCallback(() => {
    setZoom((prevZoom) => {
      const newZoom = Math.min(prevZoom + ZOOM_STEP, MAX_ZOOM);
      requestAnimationFrame(() => updateImageTransform(newZoom));
      return newZoom;
    });
  }, [updateImageTransform]);

  const handleZoomOut = useCallback(() => {
    setZoom((prevZoom) => {
      const newZoom = Math.max(prevZoom - ZOOM_STEP, MIN_ZOOM);
      if (newZoom === MIN_ZOOM) {
        position.current = { x: 0, y: 0 };
      }
      requestAnimationFrame(() => updateImageTransform(newZoom));
      return newZoom;
    });
  }, [updateImageTransform]);

  const handleDragStart = (clientX: number, clientY: number) => {
    if (zoom > MIN_ZOOM) {
      setIsDragging(true);
      startDragPosition.current = {
        x: clientX - position.current.x,
        y: clientY - position.current.y
      };
      if (imageRef.current) {
        imageRef.current.style.transition = 'none';
      }
    }
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (isDragging && zoom > MIN_ZOOM) {
      requestAnimationFrame(() => {
        position.current.x = clientX - startDragPosition.current.x;
        position.current.y = clientY - startDragPosition.current.y;
        updateImageTransform(zoom);
      });
    }
  };

  const handleDragEnd = () => {
    if (isDragging) {
      setIsDragging(false);
      if (imageRef.current) {
        imageRef.current.style.transition = 'transform 0.2s ease-out';
      }
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

