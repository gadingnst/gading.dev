import Image from 'next/image';

import { Parallax, ParallaxBanner, ParallaxImage } from '@/packages/components/base/Images';

/**
 * Example usage of Parallax component
 */
export default function ParallaxExample() {
  return (
    <div className="space-y-8">
      {/* Basic Parallax */}
      <section className="h-96">
        <h2 className="text-2xl font-bold mb-4">Basic Parallax</h2>
        <Parallax className="h-full rounded-lg">
          <div className="h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <h3 className="text-white text-xl font-semibold">Scroll to see parallax effect</h3>
          </div>
        </Parallax>
      </section>

      {/* Parallax with Image */}
      <section className="h-96">
        <h2 className="text-2xl font-bold mb-4">Parallax with Image</h2>
        <Parallax className="h-full rounded-lg" speed={0.8}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop"
            alt="Mountain landscape"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white text-2xl font-bold">Beautiful Landscape</h3>
          </div>
        </Parallax>
      </section>

      {/* Different Directions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Parallax Up</h3>
          <Parallax className="h-64 rounded-lg" direction="up" speed={0.6}>
            <div className="h-full bg-gradient-to-t from-accent to-accent/50 flex items-center justify-center">
              <span className="text-white font-medium">Moving Up</span>
            </div>
          </Parallax>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Parallax Down</h3>
          <Parallax className="h-64 rounded-lg" direction="down" speed={0.6}>
            <div className="h-full bg-gradient-to-b from-secondary to-secondary/50 flex items-center justify-center">
              <span className="text-white font-medium">Moving Down</span>
            </div>
          </Parallax>
        </div>
      </section>

      {/* Horizontal Parallax */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Parallax Left</h3>
          <Parallax className="h-64 rounded-lg" direction="left" speed={0.4}>
            <div className="h-full bg-gradient-to-l from-warning to-warning/50 flex items-center justify-center">
              <span className="text-white font-medium">Moving Left</span>
            </div>
          </Parallax>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Parallax Right</h3>
          <Parallax className="h-64 rounded-lg" direction="right" speed={0.4}>
            <div className="h-full bg-gradient-to-r from-info to-info/50 flex items-center justify-center">
              <span className="text-white font-medium">Moving Right</span>
            </div>
          </Parallax>
        </div>
      </section>

      {/* Scaled Parallax */}
      <section className="h-96">
        <h2 className="text-2xl font-bold mb-4">Parallax with Scale</h2>
        <Parallax className="h-full rounded-lg" scale={1.2} speed={0.3}>
          <div className="h-full bg-gradient-to-br from-success to-success/70 flex items-center justify-center">
            <h3 className="text-white text-xl font-semibold">Scaled Parallax Effect</h3>
          </div>
        </Parallax>
      </section>

      {/* Glass Effect Parallax */}
      <section className="h-96">
        <h2 className="text-2xl font-bold mb-4">Glass Effect Parallax</h2>
        <Parallax className="h-full rounded-lg liquid-glass" speed={0.5}>
          <div className="h-full flex items-center justify-center">
            <div className="liquid-glass p-8 rounded-xl">
              <h3 className="text-base-content text-xl font-semibold">Glass Parallax</h3>
              <p className="text-base-content/70 mt-2">Combining liquid glass with parallax</p>
            </div>
          </div>
        </Parallax>
      </section>

      {/* Disabled Parallax */}
      <section className="h-64">
        <h2 className="text-xl font-bold mb-4">Disabled Parallax</h2>
        <Parallax className="h-full rounded-lg" disabled>
          <div className="h-full bg-gradient-to-r from-error to-error/50 flex items-center justify-center">
            <span className="text-white font-medium">No Parallax Effect</span>
          </div>
        </Parallax>
      </section>

      {/* ParallaxImage Example */}
      <section className="h-96">
        <h2 className="text-2xl font-bold mb-4">ParallaxImage Component</h2>
        <ParallaxImage
          src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop"
          alt="Ocean waves"
          className="h-full rounded-lg"
          speed={0.7}
          overlay
          overlayClassName="bg-blue-900/40"
        />
      </section>

      {/* ParallaxBanner Example */}
      <section>
        <h2 className="text-2xl font-bold mb-4">ParallaxBanner Component</h2>
        <ParallaxBanner
          height="60vh"
          className="rounded-lg"
          layers={[
            {
              image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
              speed: 0.3,
              opacity: 0.8
            },
            {
              speed: 0.6,
              opacity: 0.6,
              children: (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
              )
            }
          ]}
        >
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Parallax Banner</h1>
            <p className="text-lg md:text-xl opacity-90">Multi-layered parallax effect</p>
          </div>
        </ParallaxBanner>
      </section>

      {/* Complex ParallaxBanner */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Complex ParallaxBanner</h2>
        <ParallaxBanner
          height="80vh"
          className="rounded-lg"
          layers={[
            {
              image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop',
              speed: 0.2,
              opacity: 1
            },
            {
              speed: 0.5,
              opacity: 0.7,
              children: (
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              )
            },
            {
              speed: 0.8,
              opacity: 0.9,
              children: (
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
              )
            }
          ]}
        >
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6">
              Ocean Depths
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl opacity-90 max-w-2xl mx-auto">
              Experience the beauty of layered parallax effects with multiple speeds and opacities
            </p>
            <div className="mt-8">
              <button className="btn btn-primary btn-lg">
                Explore More
              </button>
            </div>
          </div>
        </ParallaxBanner>
      </section>

      {/* Spacer for scrolling */}
      <div className="h-96 flex items-center justify-center">
        <p className="text-base-content/60">Scroll up to see all parallax effects</p>
      </div>
    </div>
  );
}
