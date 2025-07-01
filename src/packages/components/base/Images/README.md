# Parallax Component

A high-performance React parallax component that creates smooth scrolling effects similar to `react-parallax`. Built with TypeScript and optimized for modern web applications.

## Features

- 🚀 **High Performance**: Uses `requestAnimationFrame` and Intersection Observer for optimal performance
- 🎯 **Multiple Directions**: Support for up, down, left, and right parallax movements
- 📱 **Mobile Optimized**: Smooth performance on mobile devices with hardware acceleration
- 🎨 **Customizable**: Configurable speed, scale, offset, and transition properties
- ♿ **Accessibility**: Can be disabled for users who prefer reduced motion
- 🎭 **Liquid Glass Integration**: Works seamlessly with the liquid glass design system
- 🔧 **TypeScript**: Full TypeScript support with comprehensive prop types
- 🎪 **Smooth Animations**: Uses CSS transforms and will-change for optimal rendering

## Usage

```tsx
import { Parallax, ParallaxImage, ParallaxBanner } from '@/packages/components/base/Images';
import Image from 'next/image';

// Basic parallax
<Parallax>
  <div className="h-64 bg-gradient-to-r from-primary to-secondary">
    <h2>Parallax Content</h2>
  </div>
</Parallax>

// Parallax with image
<Parallax speed={0.8} direction="up">
  <Image
    src="/hero-image.jpg"
    alt="Hero"
    fill
    className="object-cover"
  />
</Parallax>

// Horizontal parallax
<Parallax direction="left" speed={0.4}>
  <div className="w-full h-64 bg-accent">
    <span>Moving Left</span>
  </div>
</Parallax>

// Scaled parallax with glass effect
<Parallax scale={1.2} className="liquid-glass">
  <div className="h-96 flex items-center justify-center">
    <h1>Scaled Glass Parallax</h1>
  </div>
</Parallax>

// ParallaxImage for optimized images
<ParallaxImage
  src="/hero-image.jpg"
  alt="Hero"
  speed={0.6}
  overlay
  overlayClassName="bg-black/30"
  className="h-96 rounded-lg"
/>

// ParallaxBanner for complex layered effects
<ParallaxBanner
  height="100vh"
  layers={[
    {
      image: "/background.jpg",
      speed: 0.3,
      opacity: 0.8
    },
    {
      speed: 0.6,
      opacity: 0.5,
      children: <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
    }
  ]}
>
  <div className="text-center text-white">
    <h1 className="text-6xl font-bold">Hero Title</h1>
    <p className="text-xl">Subtitle with parallax background</p>
  </div>
</ParallaxBanner>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Content to apply parallax effect to |
| `speed` | `number` | `0.5` | Parallax movement speed (0 = no movement, 1 = normal scroll speed) |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Direction of parallax movement |
| `scale` | `number` | `1` | Scale factor for the parallax element |
| `offset` | `number` | `0` | Additional offset in pixels |
| `disabled` | `boolean` | `false` | Disable parallax effect (useful for accessibility) |
| `className` | `string` | `undefined` | Additional CSS classes for the container |
| `style` | `CSSProperties` | `undefined` | Additional inline styles for the inner element |
| `overflow` | `boolean` | `true` | Whether to hide overflow content |
| `transition` | `string` | `'transform 0.075s ease-out'` | CSS transition for smooth movement |

### ParallaxImage Props

Extends all `Parallax` props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | **required** | Image source URL |
| `alt` | `string` | **required** | Image alt text for accessibility |
| `width` | `number` | `undefined` | Image width (when not using fill) |
| `height` | `number` | `undefined` | Image height (when not using fill) |
| `fill` | `boolean` | `true` | Whether image should fill container |
| `priority` | `boolean` | `false` | Load image with high priority |
| `quality` | `number` | `75` | Image quality (1-100) |
| `sizes` | `string` | `undefined` | Responsive image sizes |
| `objectFit` | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | How image should fit container |
| `objectPosition` | `string` | `'center'` | Image position within container |
| `overlay` | `boolean` | `false` | Whether to show overlay |
| `overlayClassName` | `string` | `undefined` | CSS classes for overlay |
| `overlayStyle` | `CSSProperties` | `undefined` | Inline styles for overlay |
| `imageClassName` | `string` | `undefined` | CSS classes for image |
| `imageStyle` | `CSSProperties` | `undefined` | Inline styles for image |

### ParallaxBanner Props

Extends all `Parallax` props plus:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `layers` | `ParallaxLayer[]` | **required** | Array of parallax layers |
| `height` | `string \| number` | `'100vh'` | Banner height |
| `children` | `ReactNode` | `undefined` | Content to display over layers |

### ParallaxLayer Interface

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `image` | `string` | `undefined` | Background image URL |
| `speed` | `number` | `0.5` | Parallax speed for this layer |
| `opacity` | `number` | `1` | Layer opacity (0-1) |
| `children` | `ReactNode` | `undefined` | Custom content for layer |
| `className` | `string` | `undefined` | CSS classes for layer |
| `style` | `CSSProperties` | `undefined` | Inline styles for layer |
| `expanded` | `boolean` | `true` | Whether to scale layer to prevent edge gaps |

## Performance Optimization

The component includes several performance optimizations:

1. **Intersection Observer**: Only applies parallax when element is visible
2. **RequestAnimationFrame**: Smooth 60fps animations
3. **Hardware Acceleration**: Uses `translate3d` and `will-change` for GPU acceleration
4. **Event Throttling**: Prevents excessive scroll event handling
5. **Passive Event Listeners**: Non-blocking scroll events

## Accessibility

The component respects user preferences:

```tsx
// Disable for users who prefer reduced motion
<Parallax disabled={prefersReducedMotion}>
  <YourContent />
</Parallax>
```

You can detect reduced motion preference using:

```tsx
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

## Examples

### Hero Section with ParallaxImage

```tsx
<ParallaxImage
  src="/hero-bg.jpg"
  alt="Hero Background"
  className="h-screen"
  speed={0.6}
  overlay
  overlayClassName="bg-black/40"
>
  <div className="absolute inset-0 flex items-center justify-center">
    <h1 className="text-white text-4xl font-bold">Welcome</h1>
  </div>
</ParallaxImage>
```

### Complex Hero with ParallaxBanner

```tsx
<ParallaxBanner
  height="100vh"
  layers={[
    {
      image: "/mountains-bg.jpg",
      speed: 0.2,
      opacity: 1
    },
    {
      image: "/clouds.png",
      speed: 0.5,
      opacity: 0.7
    },
    {
      speed: 0.8,
      opacity: 0.6,
      children: (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-blue-900/30" />
      )
    }
  ]}
>
  <div className="text-center text-white">
    <h1 className="text-6xl font-bold mb-4">Mountain Adventure</h1>
    <p className="text-xl mb-8">Experience the beauty of nature</p>
    <button className="btn btn-primary btn-lg">Start Journey</button>
  </div>
</ParallaxBanner>
```

### Card with Glass Parallax

```tsx
<Parallax className="liquid-glass rounded-xl" speed={0.3} scale={1.1}>
  <div className="p-8">
    <h3 className="text-xl font-semibold mb-4">Glass Card</h3>
    <p className="text-base-content/70">
      This card has a subtle parallax effect with glass morphism.
    </p>
  </div>
</Parallax>
```

### Multi-directional Parallax Grid

```tsx
<div className="grid grid-cols-2 gap-4">
  <Parallax direction="left" speed={0.4}>
    <div className="h-64 bg-primary rounded-lg" />
  </Parallax>
  <Parallax direction="right" speed={0.4}>
    <div className="h-64 bg-secondary rounded-lg" />
  </Parallax>
</div>
```

## Best Practices

### General Guidelines
1. **Performance**: Use `disabled` prop on mobile devices for better performance
2. **Accessibility**: Provide `prefers-reduced-motion` support
3. **Speed Values**: Keep speed values between -1 and 1 for best results
4. **Testing**: Test on various devices and screen sizes

### ParallaxImage Best Practices
1. **Image Optimization**: Use Next.js Image optimization with appropriate `quality` and `sizes`
2. **Priority Loading**: Set `priority={true}` for above-the-fold images
3. **Alt Text**: Always provide meaningful `alt` text for accessibility
4. **Responsive Images**: Use `sizes` prop for responsive image loading

```tsx
<ParallaxImage
  src="/hero.jpg"
  alt="Mountain landscape with sunset"
  priority // For above-the-fold images
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

### ParallaxBanner Best Practices
1. **Layer Order**: Place slower-moving layers (lower speed) in background
2. **Image Formats**: Use optimized formats (WebP, AVIF) for background images
3. **Content Contrast**: Ensure text content has sufficient contrast over background
4. **Mobile Optimization**: Consider simpler layouts for mobile devices

```tsx
<ParallaxBanner
  layers={[
    { image: "/bg.webp", speed: 0.2 }, // Slowest (background)
    { image: "/mid.webp", speed: 0.5 }, // Medium
    { speed: 0.8, children: <Overlay /> } // Fastest (foreground)
  ]}
  disabled={isMobile} // Disable on mobile
>
  <Content />
</ParallaxBanner>
```

### Performance Tips
1. **Lazy Loading**: Non-critical parallax elements load lazily by default
2. **Reduced Motion**: Components respect `prefers-reduced-motion` setting
3. **Mobile Considerations**: Use `disabled` prop for mobile devices
4. **Memory Management**: Components clean up event listeners automatically

## Browser Support

- ✅ Chrome 51+
- ✅ Firefox 55+
- ✅ Safari 12.1+
- ✅ Edge 79+

Requires support for:
- Intersection Observer API
- CSS Transforms
- RequestAnimationFrame

## Related Components

- `Image` - For optimized image handling
- `Button` - For interactive elements within parallax sections
- Liquid Glass utilities - For glass morphism effects