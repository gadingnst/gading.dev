/* eslint-disable no-console */
'use client';

import { Eye, Image as ImageIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';

import LazyImage from './LazyImage';
import LazyLoadComponent from './LazyLoadComponent';
import trackWindowScroll, { useWindowScrollPosition } from './trackWindowScroll';

// Example component with scroll tracking
const ScrollTrackedLazyImage = trackWindowScroll(LazyImage);

/**
 * Custom placeholder component
 */
function ImagePlaceholder({ width, height }: { width?: number | string; height?: number | string }) {
  return (
    <div
      className="flex items-center justify-center bg-base-200 border-2 border-dashed border-base-300 rounded-lg"
      style={{ width, height: height || 200 }}
    >
      <div className="text-center text-base-content/60">
        <ImageIcon className="w-8 h-8 mx-auto mb-2" />
        <p className="text-sm">Loading image...</p>
      </div>
    </div>
  );
}

/**
 * Loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className="w-6 h-6 animate-spin" />
      <span className="ml-2">Loading content...</span>
    </div>
  );
}

/**
 * Heavy component to demonstrate lazy loading
 */
function HeavyComponent() {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border">
      <h3 className="text-xl font-bold mb-4">Heavy Component Loaded!</h3>
      <p className="mb-4">This component simulates a heavy component that takes time to load.</p>
      {isVisible && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="aspect-square bg-primary/20 rounded-lg flex items-center justify-center">
              <span className="text-sm font-medium">{i + 1}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Scroll position display component
 */
function ScrollPositionDisplay() {
  const { scrollPosition, isScrollTracking } = useWindowScrollPosition();

  return (
    <div className="fixed top-4 right-4 bg-base-100 p-3 rounded-lg shadow-lg border z-50">
      <div className="flex items-center gap-2 text-sm">
        <Eye className="w-4 h-4" />
        <span>Scroll: {Math.round(scrollPosition.y)}px</span>
        <span className={`w-2 h-2 rounded-full ${isScrollTracking ? 'bg-success' : 'bg-error'}`} />
      </div>
    </div>
  );
}

/**
 * Example usage of the LazyImage components
 */
export default function LazyImageExample() {
  const [loadCount, setLoadCount] = useState(0);
  const [beforeLoadCount, setBeforeLoadCount] = useState(0);

  const handleImageLoad = () => {
    setLoadCount(prev => prev + 1);
  };

  const handleBeforeLoad = () => {
    setBeforeLoadCount(prev => prev + 1);
  };

  return (
    <div className="space-y-12 pb-20">
      <ScrollPositionDisplay />

      {/* Stats */}
      <div className="bg-base-200 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Loading Stats</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>Images loaded: <span className="font-bold text-success">{loadCount}</span></div>
          <div>Before load calls: <span className="font-bold text-info">{beforeLoadCount}</span></div>
        </div>
      </div>

      {/* Basic LazyImage */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Lazy Loading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LazyImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
            alt="Mountain landscape"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
          <LazyImage
            src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop"
            alt="Forest landscape"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
        </div>
      </section>

      {/* Blur Effect */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Blur Effect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LazyImage
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
            alt="Forest path"
            placeholderSrc="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=50&h=38&fit=crop"
            effect="blur"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
          <LazyImage
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop"
            alt="Ocean waves"
            placeholderSrc="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=50&h=38&fit=crop"
            effect="blur"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
        </div>
      </section>

      {/* Black and White Effect */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Black and White Effect</h2>
        <LazyImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop"
          alt="Mountain panorama"
          placeholderSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=33&fit=crop"
          effect="black-and-white"
          width="100%"
          height={400}
          className="rounded-lg shadow-lg"
          onLoad={handleImageLoad}
          beforeLoad={handleBeforeLoad}
        />
      </section>

      {/* Opacity Effect */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Opacity Effect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <LazyImage
              key={i}
              src={`https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?w=400&h=300&fit=crop`}
              alt={`Gallery image ${i + 1}`}
              effect="opacity"
              width={300}
              height={200}
              className="rounded-lg shadow-lg"
              onLoad={handleImageLoad}
              beforeLoad={handleBeforeLoad}
            />
          ))}
        </div>
      </section>

      {/* Custom Placeholder */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Placeholder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LazyImage
            src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop"
            alt="Custom placeholder example"
            placeholder={<ImagePlaceholder width={400} height={300} />}
            width={400}
            height={300}
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
          <LazyImage
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop"
            alt="Another custom placeholder"
            placeholder={<ImagePlaceholder width={400} height={300} />}
            width={400}
            height={300}
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
        </div>
      </section>

      {/* Scroll Tracked Images */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Scroll Tracked Images</h2>
        <p className="text-base-content/70 mb-4">
          These images use the trackWindowScroll HOC for optimized scroll performance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollTrackedLazyImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
            alt="Scroll tracked image 1"
            effect="blur"
            placeholderSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=50&h=38&fit=crop"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
          <ScrollTrackedLazyImage
            src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop"
            alt="Scroll tracked image 2"
            effect="opacity"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
            onLoad={handleImageLoad}
            beforeLoad={handleBeforeLoad}
          />
        </div>
      </section>

      {/* LazyLoadComponent */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Lazy Load Component</h2>
        <p className="text-base-content/70 mb-4">
          This demonstrates lazy loading of any React component, not just images.
        </p>
        <LazyLoadComponent
          placeholder={<LoadingSpinner />}
          threshold={200}
          beforeLoad={() => console.log('Heavy component about to load')}
          afterLoad={() => console.log('Heavy component loaded')}
        >
          <HeavyComponent />
        </LazyLoadComponent>
      </section>

      {/* Performance Test */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Performance Test</h2>
        <p className="text-base-content/70 mb-4">
          Multiple images to test lazy loading performance.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 24 }, (_, i) => (
            <LazyImage
              key={i}
              src={`https://picsum.photos/300/200?random=${i + 100}`}
              alt={`Performance test image ${i + 1}`}
              effect="opacity"
              width={200}
              height={150}
              className="rounded-lg shadow-md"
              threshold={300}
              onLoad={handleImageLoad}
              beforeLoad={handleBeforeLoad}
            />
          ))}
        </div>
      </section>

      {/* Configuration Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Configuration Examples</h2>
        <div className="space-y-6">
          {/* High threshold */}
          <div>
            <h3 className="text-lg font-semibold mb-2">High Threshold (500px)</h3>
            <LazyImage
              src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=400&fit=crop"
              alt="High threshold example"
              threshold={500}
              width="100%"
              height={200}
              className="rounded-lg shadow-lg"
              onLoad={handleImageLoad}
              beforeLoad={handleBeforeLoad}
            />
          </div>

          {/* Debounced */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Custom Threshold (500px)</h3>
            <LazyImage
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop"
              alt="Custom threshold example"
              threshold={500}
              width="100%"
              height={200}
              className="rounded-lg shadow-lg"
              onLoad={handleImageLoad}
              beforeLoad={handleBeforeLoad}
            />
          </div>

          {/* No Intersection Observer */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Fallback Mode (No IntersectionObserver)</h3>
            <LazyImage
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
              alt="Fallback mode example"
              useIntersectionObserver={false}
              width="100%"
              height={200}
              className="rounded-lg shadow-lg"
              onLoad={handleImageLoad}
              beforeLoad={handleBeforeLoad}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
