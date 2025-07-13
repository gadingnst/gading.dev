'use client';

import React from 'react';

import Parallax, { Background } from '@/packages/components/base/Displays/Parallax';

/**
 * Example usage of the Parallax component
 */
export default function ParallaxExample() {
  return (
    <div className="space-y-8">
      {/* Basic Parallax with Background Image */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Basic Parallax with Background Image</h2>
        <Parallax
          bgImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          bgImageAlt="Mountain landscape"
          strength={200}
          className="h-96 flex items-center justify-center"
        >
          <div className="text-center text-white">
            <h3 className="text-4xl font-bold mb-4">Parallax Effect</h3>
            <p className="text-lg">Content moves independently from background</p>
          </div>
        </Parallax>
      </section>

      {/* Parallax with Blur Effect */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Dynamic Blur Parallax</h2>
        <Parallax
          bgImage="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1920&h=1080&fit=crop"
          bgImageAlt="Forest landscape"
          strength={-150}
          blur={{ min: 0, max: 10 }}
          className="h-96 flex items-center justify-center"
        >
          <div className="text-center text-white bg-black/30 p-8 rounded-lg backdrop-blur-sm">
            <h3 className="text-3xl font-bold mb-2">Dynamic Blur</h3>
            <p>Blur changes as you scroll</p>
          </div>
        </Parallax>
      </section>

      {/* Custom Background Component */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Background Element</h2>
        <Parallax strength={300} className="h-96 flex items-center justify-center">
          <Background className="bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="absolute inset-0 bg-black/20" />
          </Background>
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-2">Custom Background</h3>
            <p>Using gradient instead of image</p>
          </div>
        </Parallax>
      </section>

      {/* Render Layer Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Custom Render Layer</h2>
        <Parallax
          bgImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          bgImageAlt="Mountain landscape"
          strength={100}
          className="h-96 flex items-center justify-center"
          renderLayer={(percentage) => (
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
              style={{
                opacity: percentage * 0.8
              }}
            />
          )}
        >
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-2">Custom Layer</h3>
            <p>Overlay opacity changes with scroll</p>
          </div>
        </Parallax>
      </section>

      {/* Multiple Parallax Sections */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Multiple Sections</h2>
        <div className="space-y-4">
          <Parallax
            bgImage="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop"
            bgImageAlt="Forest path"
            strength={150}
            className="h-64 flex items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-white">Section 1</h3>
          </Parallax>

          <div className="h-32 bg-base-100 flex items-center justify-center">
            <p className="text-lg">Regular content between parallax sections</p>
          </div>

          <Parallax
            bgImage="https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1920&h=1080&fit=crop"
            bgImageAlt="Ocean waves"
            strength={-100}
            className="h-64 flex items-center justify-center"
          >
            <h3 className="text-2xl font-bold text-white">Section 2</h3>
          </Parallax>
        </div>
      </section>

      {/* Disabled Parallax */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Disabled Parallax</h2>
        <Parallax
          bgImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          bgImageAlt="Mountain landscape"
          strength={200}
          disabled
          className="h-64 flex items-center justify-center"
        >
          <div className="text-center text-white">
            <h3 className="text-2xl font-bold mb-2">Disabled Effect</h3>
            <p>No parallax movement</p>
          </div>
        </Parallax>
      </section>
    </div>
  );
}
