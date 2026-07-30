'use client';

import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import cn from '@/designs/utils/cn';

interface ImageFullscreenModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

function ImageFullscreenModal({ src, alt, isOpen, onClose }: ImageFullscreenModalProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const imageRef = useRef<HTMLDivElement>(null);
  const lastTouchDistance = useRef<number | null>(null);
  const lastTouchCenter = useRef<{ x: number; y: number } | null>(null);
  const lastTapTime = useRef(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 4;

  const resetState = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true);
    setTimeout(() => {
      setIsAnimatingOut(false);
      setIsVisible(false);
      resetState();
      onClose();
    }, 200);
  }, [onClose, resetState]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isVisible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, handleClose]);

  const clampScale = (s: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, s));

  const handleZoomIn = () => {
    setScale((prev) => clampScale(prev + 0.5));
  };

  const handleZoomOut = () => {
    const newScale = clampScale(scale - 0.5);
    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  };

  const getTouchDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastTouchDistance.current = getTouchDistance(e.touches);
      lastTouchCenter.current = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2
      };
    } else if (e.touches.length === 1) {
      // Double tap detection
      const now = Date.now();
      if (now - lastTapTime.current < 300) {
        // Double tap: toggle zoom
        if (scale > 1) {
          setScale(1);
          setPosition({ x: 0, y: 0 });
        } else {
          setScale(2);
        }
        lastTapTime.current = 0;
      } else {
        lastTapTime.current = now;
      }

      // Pan start
      if (scale > 1) {
        isDragging.current = true;
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        positionStart.current = { ...position };
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch zoom
      const dist = getTouchDistance(e.touches);
      if (lastTouchDistance.current !== null) {
        const delta = dist / lastTouchDistance.current;
        setScale((prev) => clampScale(prev * delta));
      }
      lastTouchDistance.current = dist;
    } else if (e.touches.length === 1 && isDragging.current && scale > 1) {
      // Pan
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      setPosition({
        x: positionStart.current.x + dx,
        y: positionStart.current.y + dy
      });
    }
  };

  const handleTouchEnd = () => {
    lastTouchDistance.current = null;
    lastTouchCenter.current = null;
    isDragging.current = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      e.preventDefault();
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      positionStart.current = { ...position };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current && scale > 1) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition({
        x: positionStart.current.x + dx,
        y: positionStart.current.y + dy
      });
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity duration-200',
        isAnimatingOut ? 'opacity-0' : 'opacity-100'
      )}
      onClick={handleOverlayClick}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 cursor-pointer rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Zoom controls */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        <button
          onClick={handleZoomOut}
          disabled={scale <= MIN_ZOOM}
          className={cn(
            'rounded-full cursor-pointer bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20',
            scale <= MIN_ZOOM && 'opacity-30 cursor-not-allowed'
          )}
          aria-label="Zoom Out"
        >
          <ZoomOut size={20} />
        </button>
        <span className="min-w-[3rem] text-center text-sm text-white/80">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          disabled={scale >= MAX_ZOOM}
          className={cn(
            'rounded-full cursor-pointer bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20',
            scale >= MAX_ZOOM && 'opacity-30 cursor-not-allowed'
          )}
          aria-label="Zoom In"
        >
          <ZoomIn size={20} />
        </button>
      </div>

      {/* Image container */}
      <div
        ref={imageRef}
        className="flex max-h-[85vh] max-w-[90vw] items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ touchAction: 'none', cursor: scale > 1 ? (isDragging.current ? 'grabbing' : 'grab') : 'default' }}
      >
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-[90vw] select-none object-contain"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging.current ? 'none' : 'transform 0.2s ease-out'
          }}
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
}

export default ImageFullscreenModal;
